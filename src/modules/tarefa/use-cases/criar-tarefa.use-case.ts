import { CriarTarefaDTO } from "../dto/criar-tarefa.dto";
import { RespostaTarefaDTO } from "../dto/resposta-tarefa.dto";
import { ITarefaRepository } from "../repositories/ITarefa.repository";
import { IClientePfRepository } from "@/modules/cliente-pf/repositories/ICliente-pf.repository";
import { INegociacaoPfRepository } from "@/modules/negociacao-pf/repositories/INegociacao-pf.repository";
import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";

export class CriarTarefaUseCase {
  constructor(
    private readonly tarefaRepository: ITarefaRepository,
    private readonly clienteRepository?: IClientePfRepository, 
    private readonly negociacaoRepository?: INegociacaoPfRepository
  ) {}

  async execute(dados: CriarTarefaDTO): Promise<RespostaTarefaDTO> {
    try {
      if (!dados.clienteId && !dados.negociacaoId) {
        return { sucesso: false, mensagem: "A tarefa deve estar vinculada a um cliente ou a uma negociação." };
      }

      if (dados.dataVencimento) {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); 
        const vencimento = new Date(dados.dataVencimento);
        
        if (vencimento < hoje) {
          return { sucesso: false, mensagem: "A data de vencimento não pode estar no passado." };
        }
      }

      if (dados.clienteId && this.clienteRepository) {
        const clienteExiste = await this.clienteRepository.buscarPorId(dados.clienteId);
        if (!clienteExiste) {
          return { sucesso: false, mensagem: "O cliente informado não existe." };
        }
      }

      if (dados.negociacaoId && this.negociacaoRepository) {
        const negociacaoExiste = await this.negociacaoRepository.buscarPorId(dados.negociacaoId);
        if (!negociacaoExiste) {
          return { sucesso: false, mensagem: "A negociação informada não existe." };
        }
      }

      const tarefaCriada = await this.tarefaRepository.salvar(dados);

      return {
        sucesso: true,
        mensagem: "Tarefa criada com sucesso!",
        dados: tarefaCriada as Tarefa,
      };

    } catch (error: unknown) {
      console.error("[CriarTarefaUseCase] Erro:", error);
      return {
        sucesso: false,
        mensagem: error instanceof Error ? error.message : "Erro interno ao criar a tarefa.",
      };
    }
  }
}