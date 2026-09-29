export type FaseNegociacaoPf = 
  | "CAPTURA"       // 1. Topo (Espelha "LEAD")
  | "ENGAJAMENTO"   // 2. Meio (Espelha "CONTATO")
  | "QUALIFICACAO"  // 3. Negociação de Valores (Espelha "PROPOSTA")
  | "CONVERSAO"     // 4. Ganho Realizado (Espelha "FECHADO")
  | "DESISTENCIA";  // 5. Perda Realizada (Espelha "INDEFERIDO")