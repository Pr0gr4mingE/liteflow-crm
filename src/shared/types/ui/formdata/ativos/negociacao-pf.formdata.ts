import {NegociacaoPf} from "@/shared/types/domain/ativos/negociacoes/INegociacao-pf"

export type NegociacaoPfFormdata = Omit<NegociacaoPf, "id"
|"usuarioResponsavelId"
|"dataCriacao"
|"dataAtualizacao"
|"motivoPerda"
|"clienteId">
