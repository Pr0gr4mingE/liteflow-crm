"use client";

import { useState, useEffect } from "react";
import { buscarUsuarioLogadoAction, UsuarioPerfil } from "@/actions/usuario/buscar-usuario-logado.action";

export function usePerfil() {
  const [usuario, setUsuario] = useState<UsuarioPerfil | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;

    async function carregarPerfil() {
      try {
        const dados = await buscarUsuarioLogadoAction();
        
        if (montado) {
          if (dados) {
            setUsuario(dados);
          } else {
            setErro("Não foi possível carregar os dados do perfil.");
          }
        }
      } catch (error) {
        console.error("[Erro no Hook - Perfil]:", error);
        if (montado) setErro("Falha ao se comunicar com o servidor.");
      } finally {
        if (montado) setCarregando(false);
      }
    }

    carregarPerfil();

    return () => {
      montado = false;
    };
  }, []);

  return {
    usuario,
    carregando,
    erro
  };
}