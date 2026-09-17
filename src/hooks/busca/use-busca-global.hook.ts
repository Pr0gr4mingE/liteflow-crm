"use client";

import { useState, useEffect } from "react";
import { buscaGlobalAction } from "@/actions/busca/busca-global.action";
import { ResultadoBuscaDTO } from "@/modules/busca/dto/resultado-busca.dto";
import { useDebounce } from "@/shared/hooks/busca/use-debounce.hook";

export function useBuscaGlobal(termoOriginal: string) {
  // Atrasa a busca em 400ms para poupar o banco de dados
  const termo = useDebounce(termoOriginal, 400);
  
  const [resultados, setResultados] = useState<ResultadoBuscaDTO[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;

    async function executarBusca() {
      if (!termo || termo.trim().length < 2) {
        setResultados([]);
        setErro(null);
        setCarregando(false);
        return;
      }

      setCarregando(true);
      setErro(null);

      const resposta = await buscaGlobalAction(termo);

      if (montado) {
        if (resposta.sucesso) {
          setResultados(resposta.dados || []);
        } else {
          setErro(resposta.mensagem);
          setResultados([]);
        }
        setCarregando(false);
      }
    }

    executarBusca();

    return () => {
      montado = false;
    };
  }, [termo]);

  return { resultados, carregando, erro };
}