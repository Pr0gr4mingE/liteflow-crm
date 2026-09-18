"use client";

import { MAPA_CORES_FASES_HEX } from "@/shared/utils/constantes/pipeline-fases";

interface ItemFunil {
  fase: string;
  quantidade: number;
  valorTotal: number;
}

interface GraficoFunilProps {
  dados: ItemFunil[];
}

export function GraficoFunil({ dados }: GraficoFunilProps) {
  if (!dados || dados.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-400">
        Nenhuma negociação em andamento para exibir no funil.
      </div>
    );
  }

  const formatarMoeda = (valor: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

  const maiorValor = Math.max(...dados.map((d) => d.valorTotal), 1);

  return (
    <div className="h-72 w-full pt-4 pb-2 flex flex-col justify-end">
      {/* Container principal das colunas com espaçamento e alinhamento à base */}
      <div className="flex h-56 items-end justify-around gap-3 px-2 border-b border-slate-100 pb-3">
        {dados.map((item, index) => {
          // Mantém uma altura proporcional, mas limita o crescimento excessivo e garante visibilidade mínima
          const alturaPercentual = Math.max((item.valorTotal / maiorValor) * 100, 6);

          return (
            <div key={`${item.fase}-${index}`} className="flex flex-col items-center group relative h-full justify-end flex-1 max-w-[64px]">
              
              {/* Tooltip Flutuante */}
              <div className="absolute bottom-full mb-2.5 hidden group-hover:flex flex-col items-center z-20 w-max pointer-events-none transition-all">
                <div className="bg-slate-900 text-white text-xs rounded-lg py-1.5 px-3 text-center shadow-xl border border-slate-800">
                  <span className="block font-semibold text-slate-100">{formatarMoeda(item.valorTotal)}</span>
                  <span className="block text-slate-400 text-[11px] mt-0.5">{item.quantidade} {item.quantidade === 1 ? 'negociação' : 'negociações'}</span>
                </div>
                <div className="w-2 h-2 bg-slate-900 transform rotate-45 -mt-1 border-r border-b border-slate-800"></div>
              </div>

              {/* Valor numérico discreto flutuando logo acima da barra */}
              <span className="text-[10px] text-slate-400 font-medium mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity truncate w-full text-center">
                {item.quantidade}x
              </span>

              {/* Barra Estilizada (Mais fina, elegante e com cantos arredondados) */}
              <div
                className="w-8 sm:w-10 rounded-t-lg transition-all duration-300 ease-out hover:opacity-90 shadow-sm cursor-pointer"
                style={{
                  height: `${alturaPercentual}%`,
                  backgroundColor: MAPA_CORES_FASES_HEX[item.fase] || "#cbd5e1",
                }}
              ></div>
              
              {/* Rótulo do Eixo X (Nome da fase em caixa baixa elegante e fonte limpa) */}
              <span className="absolute top-full mt-3 text-[11px] text-slate-500 font-medium text-center w-20 truncate tracking-tight">
                {item.fase.toLowerCase()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}