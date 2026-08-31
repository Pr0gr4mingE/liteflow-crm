import {ClientePf} from "@/shared/types/domain/ativos/clientes/ICliente-pf"

export type ClientePfFormdata = Omit<ClientePf, "id"|"usuarioResponsavelId"|"dataCriacao"|"dataAtualizacao">