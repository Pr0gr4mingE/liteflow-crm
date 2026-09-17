export interface KpiBruto {
  receitaTotal: number;
  ticketMedio: number;
  taxaConversao: number;
  previsaoMes: number; // <-- Alterado: sai o array, entra o valor já calculado no banco
}