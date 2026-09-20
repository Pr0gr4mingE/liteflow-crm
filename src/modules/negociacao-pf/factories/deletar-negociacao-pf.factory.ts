import { NegociacaoPfRepository } from "@/modules/negociacao-pf/repositories/negociacao-pf.repository";
import { DeletarNegociacaoPfUseCase } from "@/modules/negociacao-pf/use-cases/deletar-negociacao-pf.use-case";
import { DeletarNegociacaoPfHandler } from "@/modules/negociacao-pf/handlers/deletar-negociacao-pf.handler";

export function makeDeletarNegociacaoPfHandler(): DeletarNegociacaoPfHandler {
  const repository = new NegociacaoPfRepository();
  const useCase = new DeletarNegociacaoPfUseCase(repository);
  return new DeletarNegociacaoPfHandler(useCase);
}