import { NegociacaoPjRepository } from "../repositories/negociacao-pj.repository";
import { ListarNegociacoesPjUseCase } from "../use-cases/listar-negociacao-pj.use-case";
import { ListarNegociacoesPjHandler } from "../handlers/listar-negociacao-pj.handler";

export const makeListarNegociacoesPjHandler = (): ListarNegociacoesPjHandler => {
  const repository = new NegociacaoPjRepository();
  const useCase = new ListarNegociacoesPjUseCase(repository);
  return new ListarNegociacoesPjHandler(useCase);
};