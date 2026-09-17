import { eq, ne, and, asc, isNotNull, gte, inArray, sql } from "drizzle-orm"; 
import { db } from "@/infrastructure/database/db";
import { tarefasTable } from "@/infrastructure/database/schemas/tarefa.schema";
import { negociacoesPfTable } from "@/infrastructure/database/schemas/negociacao-pf.schema";
import { negociacoesPjTable } from "@/infrastructure/database/schemas/negociacao-pj.schema";
import { IDashboardRepository } from "./IDashboard.repository";
import { FunilBrutoItem } from "@/shared/types/ui/dashboard/dados-brutos/funil-bruto-item";
import { KpiBruto } from "@/shared/types/ui/dashboard/dados-brutos/kpi-bruto";
import { NegociacaoBruta } from "@/shared/types/ui/dashboard/dados-brutos/negociacao-bruta";
import { TarefaBruta } from "@/shared/types/ui/dashboard/dados-brutos/tarefa-bruta";

export class DashboardRepository implements IDashboardRepository {
  
  async obterTarefasPendentes(usuarioId: string, tipo: string, limite: number): Promise<TarefaBruta[]> {
    const baseWhere = and(
      eq(tarefasTable.usuarioResponsavelId, usuarioId),
      ne(tarefasTable.status, "CONCLUIDA")
    );

    let filtroTipo = undefined;

    // Se for PF, traz apenas tarefas vinculadas a negociacoes PF
    if (tipo === "PF") {
      const subqueryPf = db.select({ id: negociacoesPfTable.id }).from(negociacoesPfTable);
      filtroTipo = inArray(tarefasTable.negociacaoId, subqueryPf);
    } 
    // Se for PJ, traz apenas tarefas vinculadas a negociacoes PJ
    else if (tipo === "PJ") {
      const subqueryPj = db.select({ id: negociacoesPjTable.id }).from(negociacoesPjTable);
      filtroTipo = inArray(tarefasTable.negociacaoId, subqueryPj);
    }

    const tarefas = await db.select({
        id: tarefasTable.id,
        titulo: tarefasTable.titulo,
        dataVencimento: tarefasTable.dataVencimento,
      })
      .from(tarefasTable)
      .where(filtroTipo ? and(baseWhere, filtroTipo) : baseWhere)
      .orderBy(asc(tarefasTable.dataVencimento))
      .limit(limite);

    return tarefas as TarefaBruta[];
  }

  async obterNegociacoesProximasAoFechamento(usuarioId: string, tipo: string, limite: number): Promise<NegociacaoBruta[]> {
    const buscarPf = tipo === "TODOS" || tipo === "PF";
    const buscarPj = tipo === "TODOS" || tipo === "PJ";
    
    const dataAtual = new Date(); 

    let pfPromise: Promise<NegociacaoBruta[]> = Promise.resolve([]);
    let pjPromise: Promise<NegociacaoBruta[]> = Promise.resolve([]);

    if (buscarPf) {
      pfPromise = db.select({
          id: negociacoesPfTable.id,
          titulo: negociacoesPfTable.titulo,
          valor: negociacoesPfTable.valor,
          dataPrevisaoFechamento: negociacoesPfTable.dataPrevisaoFechamento,
        })
        .from(negociacoesPfTable)
        .where(
          and(
            eq(negociacoesPfTable.usuarioResponsavelId, usuarioId),
            isNotNull(negociacoesPfTable.dataPrevisaoFechamento),
            gte(negociacoesPfTable.dataPrevisaoFechamento, dataAtual)
          )
        )
        .orderBy(asc(negociacoesPfTable.dataPrevisaoFechamento))
        .limit(limite)
        .then(res => res as NegociacaoBruta[]);
    }

    if (buscarPj) {
      pjPromise = db.select({
          id: negociacoesPjTable.id,
          titulo: negociacoesPjTable.titulo,
          valor: negociacoesPjTable.valor,
          dataPrevisaoFechamento: negociacoesPjTable.dataPrevisaoFechamento,
        })
        .from(negociacoesPjTable)
        .where(
          and(
            eq(negociacoesPjTable.usuarioResponsavelId, usuarioId),
            isNotNull(negociacoesPjTable.dataPrevisaoFechamento),
            gte(negociacoesPjTable.dataPrevisaoFechamento, dataAtual)
          )
        )
        .orderBy(asc(negociacoesPjTable.dataPrevisaoFechamento))
        .limit(limite)
        .then(res => res as NegociacaoBruta[]);
    }

    const [pf, pj] = await Promise.all([pfPromise, pjPromise]);

    const negociacoes: NegociacaoBruta[] = [...pf, ...pj];

    if (tipo === "TODOS") {
      negociacoes.sort((a, b) => new Date(a.dataPrevisaoFechamento).getTime() - new Date(b.dataPrevisaoFechamento).getTime());
    }

    return negociacoes.slice(0, limite);
  }

  async obterKpis(usuarioId: string, tipo: string): Promise<KpiBruto> {
    const buscarPf = tipo === "TODOS" || tipo === "PF";
    const buscarPj = tipo === "TODOS" || tipo === "PJ";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gerarAgregados = async (tabela: any, tipoCliente: "PF" | "PJ") => {
      
      // AQUI ESTÁ A CORREÇÃO: Puxamos a coluna .fase em vez de .status
      // Se no seu arquivo de schema (ex: negociacao-pf.schema.ts) o nome exportado for status, mude para tabela.status
      const colunaFase = tabela.fase; 

      const condicaoGanho = tipoCliente === "PF" 
        ? sql`${colunaFase} IN ('CONVERSAO', 'FIDELIZACAO')` 
        : sql`${colunaFase} = 'FECHADO'`;

      const condicaoPerdido = tipoCliente === "PF" 
        ? sql`${colunaFase} = 'DESISTENCIA'` 
        : sql`${colunaFase} = 'INDEFERIDO'`;

      const condicaoAberto = tipoCliente === "PF"
        ? sql`${colunaFase} NOT IN ('CONVERSAO', 'FIDELIZACAO', 'DESISTENCIA')`
        : sql`${colunaFase} NOT IN ('FECHADO', 'INDEFERIDO')`;

      const resultado = await db.select({
        receita: sql<number>`COALESCE(SUM(CASE WHEN ${condicaoGanho} THEN ${tabela.valor} ELSE 0 END), 0)`,
        qtdGanhos: sql<number>`CAST(SUM(CASE WHEN ${condicaoGanho} THEN 1 ELSE 0 END) AS INTEGER)`,
        qtdPerdidos: sql<number>`CAST(SUM(CASE WHEN ${condicaoPerdido} THEN 1 ELSE 0 END) AS INTEGER)`,
        previsaoMes: sql<number>`COALESCE(SUM(CASE WHEN ${condicaoAberto} AND date_trunc('month', ${tabela.dataPrevisaoFechamento}) = date_trunc('month', CURRENT_DATE) THEN ${tabela.valor} ELSE 0 END), 0)`
      })
      .from(tabela)
      .where(eq(tabela.usuarioResponsavelId, usuarioId));

      return resultado[0];
    };

    const [aggPf, aggPj] = await Promise.all([
      buscarPf ? gerarAgregados(negociacoesPfTable, "PF") : Promise.resolve({ receita: 0, qtdGanhos: 0, qtdPerdidos: 0, previsaoMes: 0 }),
      buscarPj ? gerarAgregados(negociacoesPjTable, "PJ") : Promise.resolve({ receita: 0, qtdGanhos: 0, qtdPerdidos: 0, previsaoMes: 0 })
    ]);

    const receitaTotal = Number(aggPf.receita) + Number(aggPj.receita);
    const qtdGanhos = Number(aggPf.qtdGanhos) + Number(aggPj.qtdGanhos);
    const qtdPerdidos = Number(aggPf.qtdPerdidos) + Number(aggPj.qtdPerdidos);
    const previsaoMes = Number(aggPf.previsaoMes) + Number(aggPj.previsaoMes);

    const ticketMedio = qtdGanhos > 0 ? receitaTotal / qtdGanhos : 0;
    const totalFinalizados = qtdGanhos + qtdPerdidos;
    const taxaConversao = totalFinalizados > 0 ? (qtdGanhos / totalFinalizados) * 100 : 0;

    return {
      receitaTotal,
      ticketMedio,
      taxaConversao,
      previsaoMes
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async obterAgrupamentoPorFase(_usuarioId: string, _tipo: string): Promise<FunilBrutoItem[]> {
    return [] as FunilBrutoItem[];
  }
}