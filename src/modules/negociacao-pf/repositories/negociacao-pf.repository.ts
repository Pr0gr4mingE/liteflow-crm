import { eq, between } from "drizzle-orm";
import { db } from "@/infrastructure/database/db";
import { negociacoesPfTable } from "@/infrastructure/database/schemas/negociacao-pf.schema";
import { INegociacaoPfRepository } from "./INegociacao-pf.repository";
import { CriarNegociacaoPfDTO } from "../dto/criar-negociacao-pf.dto";
import { NegociacaoPf } from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf";
import { FaseNegociacaoPf } from "@/shared/utils/types/fase-negociacao-pf.type";

export class NegociacaoPfRepository implements INegociacaoPfRepository {
  async salvar(dados: CriarNegociacaoPfDTO): Promise<NegociacaoPf> {
    const [novaNegociacao] = await db
      .insert(negociacoesPfTable)
      .values(dados as typeof negociacoesPfTable.$inferInsert) // <-- Correção aplicada
      .returning();
    return novaNegociacao as NegociacaoPf;
  }

  // ... (buscas inalteradas)
  async buscarPorId(id: string): Promise<NegociacaoPf | null> {
    const [negociacao] = await db.select().from(negociacoesPfTable).where(eq(negociacoesPfTable.id, id));
    return (negociacao as NegociacaoPf) || null;
  }

  async buscarPorTitulo(titulo: string): Promise<NegociacaoPf[]> {
      const negociacoes = await db.select().from(negociacoesPfTable).where(eq(negociacoesPfTable.titulo, titulo));
      return negociacoes as NegociacaoPf[];
  }

  async buscarPorIntervaloDeValor(valorMin: number, valorMax: number): Promise<NegociacaoPf[]> {
    const negociacoes = await db
      .select()
      .from(negociacoesPfTable)
      .where(between(negociacoesPfTable.valor, valorMin, valorMax));
      
    return negociacoes as NegociacaoPf[];
  }

  async buscarPorFase(fase: FaseNegociacaoPf): Promise<NegociacaoPf[]> {
    const negociacoes = await db.select().from(negociacoesPfTable).where(eq(negociacoesPfTable.fase, fase));
    return negociacoes as NegociacaoPf[];
  }

  async buscarPorDataPrevisao(dataInicial: Date, dataFinal: Date): Promise<NegociacaoPf[]> {
    const negociacoes = await db.select().from(negociacoesPfTable).where(between(negociacoesPfTable.dataPrevisaoFechamento, dataInicial, dataFinal));
    return negociacoes as NegociacaoPf[];
  }
}