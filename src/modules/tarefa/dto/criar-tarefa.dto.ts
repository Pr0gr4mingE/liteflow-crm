import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";

export type CriarTarefaDTO = Omit<
  Tarefa,
  "id" | "dataCriacao" | "dataAtualizacao"
>;