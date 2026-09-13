import { NegociacaoPfRepository } from "../repositories/negociacao-pf.repository";
import { ListarNegociacoesPfUseCase } from "../use-cases/listar-negociacao-pf.use-case";
import { ListarNegociacoesPfHandler } from "../handlers/listar-negociacao-pf.handler";

export const makeListarNegociacoesPfHandler = (): ListarNegociacoesPfHandler => {
  const repository = new NegociacaoPfRepository();
  const useCase = new ListarNegociacoesPfUseCase(repository);
  return new ListarNegociacoesPfHandler(useCase);
};
