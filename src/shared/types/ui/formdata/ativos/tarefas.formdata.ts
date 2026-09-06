import { Tarefa } from "@/shared/types/domain/ativos/tarefas/ITarefa";

export type CriarTarefaFormData = Omit<Tarefa,"usuarioResponsavelId" | "id" | "dataCriacao" | "dataAtualizacao">
  
