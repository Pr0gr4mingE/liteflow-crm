import { eq, ne, and, asc, isNotNull, gte } from "drizzle-orm"; 
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
  
  async obterTarefasPendentes(usuarioId: string, limite: number): Promise<TarefaBruta[]> {
    const tarefas = await db.select({
        id: tarefasTable.id,
        titulo: tarefasTable.titulo,
        dataVencimento: tarefasTable.dataVencimento,
      })
      .from(tarefasTable)
      .where(
        and(
          eq(tarefasTable.usuarioResponsavelId, usuarioId),
          ne(tarefasTable.status, "CONCLUIDA")
        )
      )
      .orderBy(asc(tarefasTable.dataVencimento))
      .limit(limite);

    return tarefas as TarefaBruta[];
  }

  async obterNegociacoesProximasAoFechamento(usuarioId: string, tipo: string, limite: number): Promise<NegociacaoBruta[]> {
    const buscarPf = tipo === "TODOS" || tipo === "PF";
    const buscarPj = tipo === "TODOS" || tipo === "PJ";
    
    const dataAtual = new Date(); 

    // Promessas inicializadas vazias para evitar o ternário gigante
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async obterKpis(_usuarioId: string, _tipo: string): Promise<KpiBruto> {
    return {
      receitaTotal: 150000,
      ticketMedio: 15000,
      taxaConversao: 65,
      previsaoMes: 45000 
    } as KpiBruto;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async obterAgrupamentoPorFase(_usuarioId: string, _tipo: string): Promise<FunilBrutoItem[]> {
    return [] as FunilBrutoItem[];
  }
}