export interface CriarTarefaFormProps {
  // Dados injetados automaticamente por quem chamou o modal (o Card)
  negociacaoId: string;
  clienteId?: string;
  
  // Flag para controlar se o formulário exibe tipos de tarefa B2B ou B2C
  tipoNegociacao: "PF" | "PJ"; 
  
  // Ações do Modal
  onSuccess?: () => void; 
  onCancel?: () => void;
}