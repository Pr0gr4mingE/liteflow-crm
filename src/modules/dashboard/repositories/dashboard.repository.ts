import { eq, ne, and, asc, isNotNull } from "drizzle-orm";
import { db } from "@/infrastructure/database/db";
import { tarefasTable } from "@/infrastructure/database/schemas/tarefa.schema"; // Ajuste o caminho se necessário
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

    const negociacoes: NegociacaoBruta[] = [];

  const [pf, pj] = await Promise.all([
      buscarPf ? db.select({
          id: negociacoesPfTable.id,
          titulo: negociacoesPfTable.titulo,
          valor: negociacoesPfTable.valor,
          dataPrevisaoFechamento: negociacoesPfTable.dataPrevisaoFechamento,
        })
        .from(negociacoesPfTable)
        .where(
          and(
            eq(negociacoesPfTable.usuarioResponsavelId, usuarioId),
            isNotNull(negociacoesPfTable.dataPrevisaoFechamento) // <-- Regra de negócio: só busca quem tem data
          )
        )
        .orderBy(asc(negociacoesPfTable.dataPrevisaoFechamento))
        .limit(limite)
        .then(res => res as NegociacaoBruta[]) // <-- Força a tipagem para remover o "Date | null"
      : Promise.resolve([] as NegociacaoBruta[]),
      
      buscarPj ? db.select({
          id: negociacoesPjTable.id,
          titulo: negociacoesPjTable.titulo,
          valor: negociacoesPjTable.valor,
          dataPrevisaoFechamento: negociacoesPjTable.dataPrevisaoFechamento,
        })
        .from(negociacoesPjTable)
        .where(
          and(
            eq(negociacoesPjTable.usuarioResponsavelId, usuarioId),
            isNotNull(negociacoesPjTable.dataPrevisaoFechamento) // <-- Regra de negócio
          )
        )
        .orderBy(asc(negociacoesPjTable.dataPrevisaoFechamento))
        .limit(limite)
        .then(res => res as NegociacaoBruta[]) // <-- Força a tipagem
      : Promise.resolve([] as NegociacaoBruta[])
    ]);

    negociacoes.push(...pf, ...pj);

    if (tipo === "TODOS") {
      negociacoes.sort((a, b) => new Date(a.dataPrevisaoFechamento).getTime() - new Date(b.dataPrevisaoFechamento).getTime());
    }

    return negociacoes.slice(0, limite) as NegociacaoBruta[];
  }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  async obterKpis(_usuarioId: string, _tipo: string): Promise<KpiBruto> {
    // Implementação mockada temporária. 
    // Na versão final usaremos SQL aggregates: sql`sum(${negociacoesPfTable.valor})`
    return {
      receitaTotal: 150000,
      ticketMedio: 15000,
      taxaConversao: 65,
      negociacoes: [] 
    } as KpiBruto;
  }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  async obterAgrupamentoPorFase(_usuarioId: string, _tipo: string): Promise<FunilBrutoItem[]> {
    // Implementação mockada temporária.
    // Na versão final usaremos SQL aggregates com groupBy: sql`count(${negociacoesPfTable.id})`
    return [] as FunilBrutoItem[];
  }
}