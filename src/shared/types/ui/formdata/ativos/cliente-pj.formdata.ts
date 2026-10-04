import {ClientePj} from "@/shared/types/domain/ativos/clientes/ICliente-pj"

export type ClientePjFormdata = Pick<ClientePj,
  | "email"
  | "telefone"
  | "cnpj"
  | "razaoSocial"
  | "nomeFantasia"
  | "segmento"
>;