import { CriarTarefaDTO } from "./criar-tarefa.dto";

export type AtualizacaoInternaDTO = Partial<CriarTarefaDTO> & {
  dataConclusao?: Date | null;
  dataAtualizacao?: Date;
};