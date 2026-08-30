import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";

export type CriarClientePfDTO = Omit<ClientePf, "id" | "dataCriacao" | "dataAtualizacao" >