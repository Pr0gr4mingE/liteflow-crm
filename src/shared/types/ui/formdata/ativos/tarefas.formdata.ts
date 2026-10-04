import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";

export type CriarTarefaFormData = Pick<Tarefa,
  | "titulo"
  | "tipo"
  | "status"
  | "descricao"
  | "dataVencimento"
  | "clienteId"
  | "negociacaoId"
>;