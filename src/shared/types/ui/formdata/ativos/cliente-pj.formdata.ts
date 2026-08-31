import {ClientePj} from "@/shared/types/domain/ativos/clientes/ICliente-pj"

export type ClientePjFormdata = Omit<ClientePj, "id"|"usuarioResponsavelId"|"dataCriacao"|"dataAtualizacao">
