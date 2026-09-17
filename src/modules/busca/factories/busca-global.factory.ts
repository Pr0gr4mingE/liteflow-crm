import { BuscaRepository } from "../repositories/busca.repository";
import { BuscaGlobalUseCase } from "../use-cases/busca-global.use-case";
import { BuscaGlobalHandler } from "../handlers/busca-global.handler";

export const makeBuscaGlobalHandler = (): BuscaGlobalHandler => {
  const repository = new BuscaRepository();
  const useCase = new BuscaGlobalUseCase(repository);
  return new BuscaGlobalHandler(useCase);
};