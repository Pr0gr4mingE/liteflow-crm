import { useState, useEffect } from "react";
import { obterBalancoGeralAction } from "@/actions/dashboard/obter-balanco-geral.action";
import { BalancoGeralResponse } from "@/shared/types/ui/dashboard/balanco-geral-response.type";

type TipoFunil = "TODOS" | "PF" | "PJ";

export function useDashboard(tipoInicial: TipoFunil = "TODOS") {
  const [tipoFunil, setTipoFunil] = useState<TipoFunil>(tipoInicial);
  const [dados, setDados] = useState<BalancoGeralResponse | null>(null);
  
  // O componente já nasce com o loading ativo para o primeiro render
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  
  // Um gatilho numérico apenas para forçar o recarregamento dos dados 
  // sem precisar de callbacks complexos
  const [gatilhoRecarregar, setGatilhoRecarregar] = useState(0);

  useEffect(() => {
    let componenteMontado = true; // Previne race conditions se o usuário mudar de tela rápido

    const buscarDadosNaApi = async () => {
      // NÃO chamamos setCarregando(true) aqui de forma síncrona.
      // O efeito fica puramente focado em sincronizar com a API.
      const resposta = await obterBalancoGeralAction(tipoFunil);

      if (componenteMontado) {
        if (resposta.sucesso && resposta.dados) {
          setDados(resposta.dados);
          setErro(null);
        } else {
          setErro(resposta.mensagem || "Erro ao carregar o dashboard.");
        }
        setCarregando(false);
      }
    };

    void buscarDadosNaApi();

    return () => {
      componenteMontado = false; // Cleanup perfeito
    };
  }, [tipoFunil, gatilhoRecarregar]);

  // EVENT HANDLERS: A mudança do loading ocorre onde a ação nasce (no clique/interação)
  const alterarTipoFunil = (novoTipo: TipoFunil) => {
    if (novoTipo === tipoFunil) return; // Evita loop e re-renders inúteis
    setCarregando(true);
    setTipoFunil(novoTipo);
  };

  const acionarRecarregar = () => {
    setCarregando(true);
    setGatilhoRecarregar((prev) => prev + 1);
  };

  return {
    dados,
    carregando,
    erro,
    tipoFunil,
    setTipoFunil: alterarTipoFunil, 
    recarregar: acionarRecarregar,
  };
}