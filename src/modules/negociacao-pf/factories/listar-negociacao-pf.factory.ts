import { NegociacaoPfRepository } from "../repositories/negociacao-pf.repository";
import { ListarNegociacoesPfUseCase } from "../use-cases/criar-negociacao-pf.use-case";
import { ListarNegociacoesPfHandler } from "../handlers/criar-negociacao-pf.handler";

export const makeListarNegociacoesPfHandler = (): ListarNegociacoesPfHandler => {
  const repository = new NegociacaoPfRepository();
  const useCase = new ListarNegociacoesPfUseCase(repository);
  return new ListarNegociacoesPfHandler(useCase);
};
