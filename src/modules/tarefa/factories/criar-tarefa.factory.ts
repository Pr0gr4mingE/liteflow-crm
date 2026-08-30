import { TarefaRepository } from "../repositories/tarefa.repository";
import { ClientePfRepository } from "@/modules/cliente-pf/repositories/cliente-pf.repository"; 
import { NegociacaoPfRepository } from "@/modules/negociacao-pf/repositories/negociacao-pf.repository";
import { CriarTarefaUseCase } from "../use-cases/criar-tarefa.use-case";
import { CriarTarefaHandler } from "../handlers/criar-tarefa.handler";

export const makeCriarTarefaHandler = (): CriarTarefaHandler => {
  // 1. Prepara as três ferramentas de acesso a banco
  const tarefaRepo = new TarefaRepository();
  const clienteRepo = new ClientePfRepository();
  const negociacaoRepo = new NegociacaoPfRepository();
  
  // 2. Injeta as três no Caso de Uso para ele conseguir validar os IDs
  const useCase = new CriarTarefaUseCase(tarefaRepo, clienteRepo, negociacaoRepo);
  
  return new CriarTarefaHandler(useCase);
};