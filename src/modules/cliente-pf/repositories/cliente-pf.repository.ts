import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/database/db";
import { clientesPfTable } from "@/infrastructure/database/schemas/cliente-pf.schema";
import { IClientePfRepository } from "./ICliente-pf.repository";
import { CriarClientePfDTO } from "../dto/criar-cliente-pf.dto";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";

export class ClientePfRepository implements IClientePfRepository {
  async salvar(dados: CriarClientePfDTO): Promise<ClientePf> {
    const [novoCliente] = await db
      .insert(clientesPfTable)
      .values({
        nome: dados.nome,
        cpf: dados.cpf,
        email: dados.email,
        telefone: dados.telefone,
        usuarioResponsavelId: dados.usuarioResponsavelId}) // <-- Correção aplicada
      .returning();
    return novoCliente as ClientePf;
  }

  // ... (buscas inalteradas)
  async buscarPorId(id: string): Promise<ClientePf | null> {
    const [cliente] = await db.select().from(clientesPfTable).where(eq(clientesPfTable.id, id));
    return (cliente as ClientePf) || null;
  }
  async buscarPorCpf(cpf: string): Promise<ClientePf | null> {
    const [cliente] = await db.select().from(clientesPfTable).where(eq(clientesPfTable.cpf, cpf));
    return (cliente as ClientePf) || null;
  }
  async buscarPorEmail(email: string): Promise<ClientePf | null> {
    const [cliente] = await db.select().from(clientesPfTable).where(eq(clientesPfTable.email, email));
    return (cliente as ClientePf) || null;
  }
  async buscarPorNome(nome: string): Promise<ClientePf[]> {
    const clientes = await db.select().from(clientesPfTable).where(eq(clientesPfTable.nome, nome));
    return clientes as ClientePf[];
  }
  async buscarPorTelefone(telefone: string): Promise<ClientePf[]> {
    const clientes = await db.select().from(clientesPfTable).where(eq(clientesPfTable.telefone, telefone));
    return clientes as ClientePf[];
  }
  async listarPorUsuarioId(usuarioId: string): Promise<ClientePf[]> {
    const clientes = await db
      .select()
      .from(clientesPfTable)
      .where(eq(clientesPfTable.usuarioResponsavelId, usuarioId));
      
    return clientes as ClientePf[];
  }
}