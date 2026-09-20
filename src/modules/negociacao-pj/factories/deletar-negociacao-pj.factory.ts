import { NegociacaoPjRepository } from "@/modules/negociacao-pj/repositories/negociacao-pj.repository";
import { DeletarNegociacaoPjUseCase } from "@/modules/negociacao-pj/use-cases/deletar-negociacao-pj.use-case";
import { DeletarNegociacaoPjHandler } from "@/modules/negociacao-pj/handlers/deletar-negociacao-pj.handler";

export function makeDeletarNegociacaoPjHandler(): DeletarNegociacaoPjHandler {
  const repository = new NegociacaoPjRepository();
  const useCase = new DeletarNegociacaoPjUseCase(repository);
  return new DeletarNegociacaoPjHandler(useCase);
}