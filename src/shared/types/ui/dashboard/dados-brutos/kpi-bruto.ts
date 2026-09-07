export interface KpiBruto {
  receitaTotal: number;
  ticketMedio: number;
  taxaConversao: number;
  negociacoes: Array<{ valor: number; dataPrevisaoFechamento: Date | string }>;
}