import {ClientePf} from "@/shared/types/domain/ativos/clientes/ICliente-pf"

export type ClientePfFormdata = Pick<ClientePf,
  | "cpf"
  | "nome"
  | "email"
  | "telefone"
>;