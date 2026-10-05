import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/database/db";
import { usuariosTable } from "@/infrastructure/database/schemas/usuario.schema";

// IMPORTANTE: Ajuste estes caminhos para os seus arquivos de schema corretos
import { clientesPfTable } from "@/infrastructure/database/schemas/cliente-pf.schema";
import { clientesPjTable } from "@/infrastructure/database/schemas/cliente-pj.schema";
import { negociacoesPfTable } from "@/infrastructure/database/schemas/negociacao-pf.schema";
import { negociacoesPjTable } from "@/infrastructure/database/schemas/negociacao-pj.schema";
import { tarefasTable } from "@/infrastructure/database/schemas/tarefa.schema";

import { IUsuarioRepository } from "./IUsuario.repository";
import { CriarUsuarioDTO } from "../dto/criar-usuario.dto";
import { Usuario } from "@/shared/types/domain/agentes/IUsuario";
import { CargoUsuario } from "@/shared/utils/types/cargo-usuario.type";
import { AtualizarUsuarioDTO } from "../dto/atualizar-usuario.dto";

export class UsuarioRepository implements IUsuarioRepository {
  async salvar(dados: CriarUsuarioDTO): Promise<Usuario> {
    const [novoUsuario] = await db
      .insert(usuariosTable)
      .values(dados as typeof usuariosTable.$inferInsert)
      .returning();

    return novoUsuario as Usuario;
  }

  async atualizar(id: string, dados: AtualizarUsuarioDTO): Promise<Usuario> {
    const [usuarioAtualizado] = await db
      .update(usuariosTable)
      .set({
        ...dados,
        dataAtualizacao: new Date(),
      })
      .where(eq(usuariosTable.id, id))
      .returning();

    return usuarioAtualizado as Usuario;
  }

  // NOVO: Exclusão em Cascata utilizando Transação do Drizzle
  async deletarComAtivos(id: string): Promise<void> {
    await db.transaction(async (tx) => {
      // 1. Apaga o nível mais profundo: Tarefas
      await tx.delete(tarefasTable).where(eq(tarefasTable.usuarioResponsavelId, id));

      // 2. Apaga o nível intermediário: Negociações
      await tx.delete(negociacoesPfTable).where(eq(negociacoesPfTable.usuarioResponsavelId, id));
      await tx.delete(negociacoesPjTable).where(eq(negociacoesPjTable.usuarioResponsavelId, id));

      // 3. Apaga a base dos ativos: Clientes
      await tx.delete(clientesPfTable).where(eq(clientesPfTable.usuarioResponsavelId, id));
      await tx.delete(clientesPjTable).where(eq(clientesPjTable.usuarioResponsavelId, id));

      // 4. Finalmente, apaga o próprio Usuário
      await tx.delete(usuariosTable).where(eq(usuariosTable.id, id));
    });
  }

  // Buscas Únicas
  async buscarPorId(id: string): Promise<Usuario | null> {
    const [usuario] = await db.select().from(usuariosTable).where(eq(usuariosTable.id, id));
    return (usuario as Usuario) || null;
  }

  async buscarPorCpf(cpf: string): Promise<Usuario | null> {
    const [usuario] = await db.select().from(usuariosTable).where(eq(usuariosTable.cpf, cpf));
    return (usuario as Usuario) || null;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const [usuario] = await db.select().from(usuariosTable).where(eq(usuariosTable.email, email));
    return (usuario as Usuario) || null;
  }

  // Buscas em Lista
  async buscarPorNome(nome: string): Promise<Usuario[]> {
    const usuarios = await db.select().from(usuariosTable).where(eq(usuariosTable.nome, nome));
    return usuarios as Usuario[];
  }

  async buscarPorCargo(cargo: CargoUsuario): Promise<Usuario[]> {
    const usuarios = await db.select().from(usuariosTable).where(eq(usuariosTable.cargo, cargo));
    return usuarios as Usuario[];
  }
}