import { DashboardRepository } from "../repositories/dashboard.repository";
import { ObterBalancoGeralUseCase } from "../use-cases/obter-balanco-geral.use-case";
import { ObterBalancoGeralHandler } from "../handlers/obter-balanco-geral.handler";

export const makeObterBalancoGeralHandler = (): ObterBalancoGeralHandler => {
  const repository = new DashboardRepository();
  const useCase = new ObterBalancoGeralUseCase(repository);
  return new ObterBalancoGeralHandler(useCase);
};