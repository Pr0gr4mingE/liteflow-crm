import {NegociacaoPj} from "@/shared/types/domain/ativos/negociacoes/INegociacao-pj"

export type NegociacaoPjFormdata = Omit<NegociacaoPj, "id"
|"usuarioResponsavelId"
|"dataCriacao"
|"dataAtualizacao"
|"motivoPerda"
|"clienteId">
