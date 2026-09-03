import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/database/db";
import { clientesPjTable } from "@/infrastructure/database/schemas/cliente-pj.schema";
import { IClientePjRepository } from "./ICliente-pj.repository";
import { CriarClientePjDTO } from "../dto/criar-cliente-pj.dto";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";
import { SegmentoEmpresa } from "@/shared/utils/types/segmento-empresa.type";

export class ClientePjRepository implements IClientePjRepository {
  async salvar(dados: CriarClientePjDTO): Promise<ClientePj> {
    const [novoCliente] = await db
      .insert(clientesPjTable)
      .values({
        cnpj: dados.cnpj,
        razaoSocial: dados.razaoSocial,
        nomeFantasia: dados.nomeFantasia,
        email: dados.email,
        telefone: dados.telefone,
        segmento: dados.segmento,
        usuarioResponsavelId: dados.usuarioResponsavelId,
         }) // <-- Correção aplicada
      .returning();
    return novoCliente as ClientePj;
  }

  // ... (buscas inalteradas)
  async buscarPorId(id: string): Promise<ClientePj | null> {
    const [cliente] = await db.select().from(clientesPjTable).where(eq(clientesPjTable.id, id));
    return (cliente as ClientePj) || null;
  }
  async buscarPorCnpj(cnpj: string): Promise<ClientePj | null> {
    const [cliente] = await db.select().from(clientesPjTable).where(eq(clientesPjTable.cnpj, cnpj));
    return (cliente as ClientePj) || null;
  }
  async buscarPorEmail(email: string): Promise<ClientePj | null> {
    const [cliente] = await db.select().from(clientesPjTable).where(eq(clientesPjTable.email, email));
    return (cliente as ClientePj) || null;
  }
  async buscarPorRazaoSocial(razaoSocial: string): Promise<ClientePj[]> {
    const clientes = await db.select().from(clientesPjTable).where(eq(clientesPjTable.razaoSocial, razaoSocial));
    return clientes as ClientePj[];
  }
  async buscarPorNomeFantasia(nomeFantasia: string): Promise<ClientePj[]> {
    const clientes = await db.select().from(clientesPjTable).where(eq(clientesPjTable.nomeFantasia, nomeFantasia));
    return clientes as ClientePj[];
  }
  async buscarPorSegmento(segmento: SegmentoEmpresa): Promise<ClientePj[]> {
    const clientes = await db.select().from(clientesPjTable).where(eq(clientesPjTable.segmento, segmento));
    return clientes as ClientePj[];
  }
  async listarPorUsuarioId(usuarioId: string): Promise<ClientePj[]> {
      const clientes = await db
        .select()
        .from(clientesPjTable)
        .where(eq(clientesPjTable.usuarioResponsavelId, usuarioId));
        
      return clientes as ClientePj[];
    }
}