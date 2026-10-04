"use client";

import { Header } from "@/components/layout/header"; 
import { useIniciais } from "@/shared/hooks/layout/use-iniciais-icone.hook";
// Ajuste o caminho conforme a pasta onde você salvou o hook acima
import { useUsuarioLogado } from "@/shared/hooks/agentes/usuario/use-usuario-logado.hook"; 

interface HeaderFeatureProps {
  aoClicarMenu: () => void;
}

export function HeaderFeature({ aoClicarMenu }: HeaderFeatureProps) {
  // 1. Puxa os dados com 1 linha de import limpa
  const { usuario, carregando } = useUsuarioLogado();

  // 2. Faz o parse para a interface visual
  const iniciaisUsuario = useIniciais(usuario?.nome || "");
  const nomeExibicao = carregando ? "..." : usuario?.nome || "Usuário";

  // 3. Renderiza
  return (
    <Header
      aoClicarMenu={aoClicarMenu} 
      iniciais={iniciaisUsuario} 
      nomeUsuario={nomeExibicao} 
    />
  );
}