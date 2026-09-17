import { eq, ilike, and, or } from "drizzle-orm";
import { db } from "@/infrastructure/database/db";
import { clientesPfTable } from "@/infrastructure/database/schemas/cliente-pf.schema";
import { clientesPjTable } from "@/infrastructure/database/schemas/cliente-pj.schema";
import { negociacoesPfTable } from "@/infrastructure/database/schemas/negociacao-pf.schema";
import { negociacoesPjTable } from "@/infrastructure/database/schemas/negociacao-pj.schema";
import { tarefasTable } from "@/infrastructure/database/schemas/tarefa.schema";
import { IBuscaRepository } from "./IBusca.repository";
import { ResultadoBuscaDTO } from "../dto/resultado-busca.dto";

export class BuscaRepository implements IBuscaRepository {
  async buscarGeral(termo: string, usuarioId: string): Promise<ResultadoBuscaDTO[]> {
    const termoBusca = `%${termo}%`;
    const resultados: ResultadoBuscaDTO[] = [];

    // 1. Query: Clientes PF
    const clientesPfQuery = db
      .select({
        id: clientesPfTable.id,
        nome: clientesPfTable.nome,
        email: clientesPfTable.email,
      })
      .from(clientesPfTable)
      .where(
        and(
          eq(clientesPfTable.usuarioResponsavelId, usuarioId),
          or(
            ilike(clientesPfTable.nome, termoBusca),
            ilike(clientesPfTable.email, termoBusca)
          )
        )
      )
      .limit(5);

    // 2. Query: Clientes PJ
    const clientesPjQuery = db
      .select({
        id: clientesPjTable.id,
        nome: clientesPjTable.razaoSocial, // Ajuste para 'nomeFantasia' ou 'nome' se necessário no seu schema
        email: clientesPjTable.email,
      })
      .from(clientesPjTable)
      .where(
        and(
          eq(clientesPjTable.usuarioResponsavelId, usuarioId),
          or(
            ilike(clientesPjTable.razaoSocial, termoBusca),
            ilike(clientesPjTable.email, termoBusca)
          )
        )
      )
      .limit(5);

    // 3. Query: Negociações PF
    const negociacoesPfQuery = db
      .select({
        id: negociacoesPfTable.id,
        titulo: negociacoesPfTable.titulo,
      })
      .from(negociacoesPfTable)
      .where(
        and(
          eq(negociacoesPfTable.usuarioResponsavelId, usuarioId),
          ilike(negociacoesPfTable.titulo, termoBusca)
        )
      )
      .limit(5);

    // 4. Query: Negociações PJ
    const negociacoesPjQuery = db
      .select({
        id: negociacoesPjTable.id,
        titulo: negociacoesPjTable.titulo,
      })
      .from(negociacoesPjTable)
      .where(
        and(
          eq(negociacoesPjTable.usuarioResponsavelId, usuarioId),
          ilike(negociacoesPjTable.titulo, termoBusca)
        )
      )
      .limit(5);

    // 5. Query: Tarefas
    const tarefasQuery = db
      .select({
        id: tarefasTable.id,
        titulo: tarefasTable.titulo,
      })
      .from(tarefasTable)
      .where(
        and(
          eq(tarefasTable.usuarioResponsavelId, usuarioId),
          ilike(tarefasTable.titulo, termoBusca)
        )
      )
      .limit(5);

    // 6. Executa TODAS as 5 queries simultaneamente
    const [clientesPf, clientesPj, negociacoesPf, negociacoesPj, tarefas] = await Promise.all([
      clientesPfQuery,
      clientesPjQuery,
      negociacoesPfQuery,
      negociacoesPjQuery,
      tarefasQuery,
    ]);

    // 7. Mapeamento - Clientes PF
    clientesPf.forEach((cliente) => {
      resultados.push({
        id: cliente.id,
        tipo: "CLIENTE",
        titulo: cliente.nome,
        subtitulo: cliente.email || "Cliente Pessoa Física",
        url: `/clientes?id=${cliente.id}`,
      });
    });

    // 8. Mapeamento - Clientes PJ
    clientesPj.forEach((cliente) => {
      resultados.push({
        id: cliente.id,
        tipo: "CLIENTE",
        titulo: cliente.nome,
        subtitulo: cliente.email || "Cliente Pessoa Jurídica",
        url: `/clientes?id=${cliente.id}`,
      });
    });

    // 9. Mapeamento - Negociações PF
    negociacoesPf.forEach((neg) => {
      resultados.push({
        id: neg.id,
        tipo: "NEGOCIACAO",
        titulo: neg.titulo,
        subtitulo: "Negociação Pessoa Física",
        url: `/negociacoes?id=${neg.id}`,
      });
    });

    // 10. Mapeamento - Negociações PJ
    negociacoesPj.forEach((neg) => {
      resultados.push({
        id: neg.id,
        tipo: "NEGOCIACAO",
        titulo: neg.titulo,
        subtitulo: "Negociação Pessoa Jurídica",
        url: `/negociacoes?id=${neg.id}`,
      });
    });

    // 11. Mapeamento - Tarefas
    tarefas.forEach((tarefa) => {
      resultados.push({
        id: tarefa.id,
        tipo: "TAREFA",
        titulo: tarefa.titulo,
        subtitulo: "Tarefa",
        url: `/tarefas?id=${tarefa.id}`, // <-- Corrigido para ?id=
      });
    });

    return resultados;
  }
}