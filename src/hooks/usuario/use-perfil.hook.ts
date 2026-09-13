"use client";

import { useState, useEffect } from "react";
import { buscarUsuarioLogadoAction, UsuarioPerfil } from "@/actions/usuario/buscar-usuario-logado.action";
import { atualizarUsuarioAction, RespostaAtualizarAction } from "@/actions/usuario/atualizar-usuario.action";
import { AtualizarUsuarioDTO } from "@/modules/usuario/dto/atualizar-usuario.dto";

export function usePerfil() {
  const [usuario, setUsuario] = useState<UsuarioPerfil | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

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
        console.error("[usePerfil]:", error); // <-- Agora a variável está sendo usada!
        if (montado) setErro("Falha ao se comunicar com o servidor.");
      } finally {
        if (montado) setCarregando(false);
      }
    }

    carregarPerfil();
    return () => { montado = false; };
  }, []);

  const atualizarPerfil = async (dados: AtualizarUsuarioDTO): Promise<boolean> => {
    setSalvando(true);
    setErro(null);
    setMensagemSucesso(null);

    try {
      const resposta: RespostaAtualizarAction = await atualizarUsuarioAction(dados);
      
      if (resposta.sucesso && resposta.dados) {
        setUsuario(resposta.dados); // Atualiza o estado local com os novos dados
        setMensagemSucesso("Perfil atualizado com sucesso!");
        return true;
      } else {
        setErro(resposta.mensagem || "Erro ao atualizar perfil.");
        return false;
      }
    } catch (error) {
      console.error("Erro na atualização:", error);
      setErro("Falha de comunicação ao tentar salvar.");
      return false;
    } finally {
      setSalvando(false);
    }
  };

  return {
    usuario,
    carregando,
    salvando,
    erro,
    mensagemSucesso,
    atualizarPerfil
  };
}