import { NegociacaoPfRepository } from "../repositories/negociacao-pf.repository";
import { AtualizarNegociacaoPfUseCase } from "../use-cases/atualizar-negociacao-pf.use-case";
import { AtualizarNegociacaoPfHandler } from "../handlers/atualizar-negociacao-pf.handler";

export const makeAtualizarNegociacaoPfHandler = () => {
  const repository = new NegociacaoPfRepository();
  const useCase = new AtualizarNegociacaoPfUseCase(repository);
  return new AtualizarNegociacaoPfHandler(useCase);
};