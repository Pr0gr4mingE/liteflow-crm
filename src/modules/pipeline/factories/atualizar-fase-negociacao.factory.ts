import { NegociacaoPfRepository } from "@/modules/negociacao-pf/repositories/negociacao-pf.repository";
import { NegociacaoPjRepository } from "@/modules/negociacao-pj/repositories/negociacao-pj.repository";
import { AtualizarFaseNegociacaoUseCase } from "../use-cases/atualizar-fase-negociacao.use-case";
import { AtualizarFaseNegociacaoHandler } from "../handlers/atualizar-fase-negociacao.handler";

export const makeAtualizarFaseNegociacaoHandler = (): AtualizarFaseNegociacaoHandler => {
  const pfRepository = new NegociacaoPfRepository();
  const pjRepository = new NegociacaoPjRepository();
  const useCase = new AtualizarFaseNegociacaoUseCase(pfRepository, pjRepository);
  
  return new AtualizarFaseNegociacaoHandler(useCase);
};