import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa"; // Ajuste o caminho se necessário

export type TarefaListagem = Pick<
  Tarefa,
  "id" | "titulo" | "descricao" | "tipo" | "status" | "dataVencimento" | "dataCriacao" | "dataConclusao"
> & {
  cliente?: { nome: string };
  negociacao?: { titulo: string };
  tipoNegociacao?: {tipo: "PF" | "PJ"}
};