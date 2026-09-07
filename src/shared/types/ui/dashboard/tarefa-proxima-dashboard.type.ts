export interface TarefaProximaDashboard {
  id: string;
  titulo: string;
  dataVencimento: string; // ISO String para ser reidratada
  atrasada: boolean; // Flag calculada no backend
}