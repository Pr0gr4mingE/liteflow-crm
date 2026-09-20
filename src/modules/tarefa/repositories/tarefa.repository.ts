import { eq, between } from "drizzle-orm";
import { db } from "@/infrastructure/database/db";
import { tarefasTable } from "@/infrastructure/database/schemas/tarefa.schema";
import { ITarefaRepository } from "./ITarefa.repository";
import { CriarTarefaDTO } from "../dto/criar-tarefa.dto";
import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";
import { StatusTarefa } from "@/shared/utils/types/status-tarefa.type";
import { TipoTarefa } from "@/shared/utils/types/tipo-tarefa.type";
import { TipoTarefaB2b } from "@/shared/utils/types/tipo-tarefa-b2b.type";
import { TipoTarefaB2c } from "@/shared/utils/types/tipo-tarefa-b2c.type";

// Imports das tabelas de B2C (PF) e B2B (PJ) para garantir que a tarefa ache o cliente e a negociação correta
import { clientesPfTable } from "@/infrastructure/database/schemas/cliente-pf.schema";
import { clientesPjTable } from "@/infrastructure/database/schemas/cliente-pj.schema";
import { negociacoesPfTable } from "@/infrastructure/database/schemas/negociacao-pf.schema";
import { negociacoesPjTable } from "@/infrastructure/database/schemas/negociacao-pj.schema";

export class TarefaRepository implements ITarefaRepository {
  async salvar(dados: CriarTarefaDTO): Promise<Tarefa> {
    const [novaTarefa] = await db
      .insert(tarefasTable)
      .values(dados as typeof tarefasTable.$inferInsert)
      .returning();
    return novaTarefa as Tarefa;
  }

  async atualizar(id: string, dados: Partial<CriarTarefaDTO>): Promise<void> {
    await db
      .update(tarefasTable)
      .set(dados)
      .where(eq(tarefasTable.id, id));
  }

  async buscarPorId(id: string): Promise<Tarefa | null> {
    const [tarefa] = await db.select().from(tarefasTable).where(eq(tarefasTable.id, id));
    return (tarefa as Tarefa) || null;
  }

  async buscarPorStatus(status: StatusTarefa): Promise<Tarefa[]> {
    const tarefas = await db.select().from(tarefasTable).where(eq(tarefasTable.status, status));
    return tarefas as Tarefa[];
  }

  async buscarPorTipo(tipo: TipoTarefa | TipoTarefaB2b | TipoTarefaB2c): Promise<Tarefa[]> {
    const tarefas = await db.select().from(tarefasTable).where(eq(tarefasTable.tipo, tipo as TipoTarefa | TipoTarefaB2b | TipoTarefaB2c));
    return tarefas as Tarefa[];
  }

  async buscarPorClienteId(clienteId: string): Promise<Tarefa[]> {
    const tarefas = await db.select().from(tarefasTable).where(eq(tarefasTable.clienteId, clienteId));
    return tarefas as Tarefa[];
  }

  async buscarPorNegociacaoId(negociacaoId: string): Promise<Tarefa[]> {
    const tarefas = await db.select().from(tarefasTable).where(eq(tarefasTable.negociacaoId, negociacaoId));
    return tarefas as Tarefa[];
  }

  async buscarPorDataVencimento(dataInicial: Date, dataFinal: Date): Promise<Tarefa[]> {
    const tarefas = await db.select().from(tarefasTable).where(between(tarefasTable.dataVencimento, dataInicial, dataFinal));
    return tarefas as Tarefa[];
  }

  async listarPorUsuarioId(usuarioId: string): Promise<Tarefa[]> {
    const resultados = await db
      .select({
        tarefa: tarefasTable,
        // Buscamos de ambas as tabelas pois a tarefa pode ser PF (B2C) ou PJ (B2B)
        clientePfNome: clientesPfTable.nome,
        clientePjNome: clientesPjTable.nomeFantasia,
        negociacaoPfTitulo: negociacoesPfTable.titulo,
        negociacaoPjTitulo: negociacoesPjTable.titulo,
      })
      .from(tarefasTable)
      // Fazemos o leftJoin em todas as tabelas. O Drizzle vai trazer 'null' na que não bater com o ID
      .leftJoin(clientesPfTable, eq(tarefasTable.clienteId, clientesPfTable.id))
      .leftJoin(clientesPjTable, eq(tarefasTable.clienteId, clientesPjTable.id))
      .leftJoin(negociacoesPfTable, eq(tarefasTable.negociacaoId, negociacoesPfTable.id))
      .leftJoin(negociacoesPjTable, eq(tarefasTable.negociacaoId, negociacoesPjTable.id))
      .where(eq(tarefasTable.usuarioResponsavelId, usuarioId));

    // Remonta os objetos pegando dinamicamente o nome que não vier nulo
    const tarefas = resultados.map(({ 
      tarefa, 
      clientePfNome, 
      clientePjNome, 
      negociacaoPfTitulo, 
      negociacaoPjTitulo 
    }) => {
      const nomeClienteFinal = clientePfNome || clientePjNome;
      const tituloNegociacaoFinal = negociacaoPfTitulo || negociacaoPjTitulo;

      return {
        ...tarefa,
        cliente: nomeClienteFinal ? { nome: nomeClienteFinal } : undefined,
        negociacao: tituloNegociacaoFinal ? { titulo: tituloNegociacaoFinal } : undefined,
      };
    });

    return tarefas as Tarefa[];
  }

  async deletar(id: string): Promise<boolean> {
      const [resultado] = await db
        .delete(tarefasTable)
        .where(eq(tarefasTable.id, id))
        .returning({ id: tarefasTable.id });
        
      return !!resultado;
    }
}