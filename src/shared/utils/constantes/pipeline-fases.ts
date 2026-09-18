export const FASES_PF = [
  { id: "CAPTURA", titulo: "Captura", tailwindClass: "bg-slate-200", hexColor: "#94a3b8" },
  { id: "ENGAJAMENTO", titulo: "Engajamento", tailwindClass: "bg-blue-100", hexColor: "#60a5fa" },
  { id: "CONVERSAO", titulo: "Conversão", tailwindClass: "bg-green-100", hexColor: "#4ade80" },
  { id: "FIDELIZACAO", titulo: "Fidelização", tailwindClass: "bg-purple-100", hexColor: "#c084fc" },
  { id: "DESISTENCIA", titulo: "Desistência", tailwindClass: "bg-red-100", hexColor: "#f87171" }
];

export const FASES_PJ = [
  { id: "LEAD", titulo: "Lead", tailwindClass: "bg-slate-200", hexColor: "#94a3b8" },
  { id: "CONTATO", titulo: "Contato", tailwindClass: "bg-blue-100", hexColor: "#60a5fa" },
  { id: "PROPOSTA", titulo: "Proposta", tailwindClass: "bg-amber-100", hexColor: "#fbbf24" },
  { id: "FECHADO", titulo: "Fechado", tailwindClass: "bg-green-100", hexColor: "#4ade80" },
  { id: "INDEFERIDO", titulo: "Indeferido", tailwindClass: "bg-red-100", hexColor: "#f87171" }
];

// Mapa utilitário para o Gráfico do Dashboard buscar a cor direto pelo ID da fase em O(1)
export const MAPA_CORES_FASES_HEX = [...FASES_PF, ...FASES_PJ].reduce((acc, fase) => {
  acc[fase.id] = fase.hexColor;
  return acc;
}, {} as Record<string, string>);