import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";

export type CriarClientePjDTO = Omit<ClientePj, "id" | "dataCriacao" | "dataAtualizacao">