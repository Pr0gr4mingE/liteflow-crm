import { NegociacaoPjRepository } from "../repositories/negociacao-pj.repository";
import { AtualizarNegociacaoPjUseCase } from "../use-cases/atualizar-negociacao-pj.use-case";
import { AtualizarNegociacaoPjHandler } from "../handlers/atualizar-negociacao-pj.handler";

export const makeAtualizarNegociacaoPjHandler = () => {
  const repository = new NegociacaoPjRepository();
  const useCase = new AtualizarNegociacaoPjUseCase(repository);
  return new AtualizarNegociacaoPjHandler(useCase);
};