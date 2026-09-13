import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa"; // Ajuste o caminho se necessário

export type TarefaListagem = Pick<
  Tarefa,
  "id" | "titulo" | "descricao" | "tipo" | "status" | "dataVencimento" | "dataCriacao"
> & {
  cliente?: { nome: string };
  negociacao?: { titulo: string };
};