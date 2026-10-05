"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletarContaAction } from "@/actions/usuario/deletar-usuario.action"; // Ajuste o path se necessário

export function useDeletarConta() {
  const [deletando, setDeletando] = useState(false);
  const router = useRouter();

  const deletarConta = async (id: string) => {
    console.log("1. [HOOK] Iniciando deleção para o ID:", id);
    setDeletando(true);
    
    try {
      const resposta = await deletarContaAction(id);
      console.log("4. [HOOK] Resposta recebida da Action:", resposta);

      if (!resposta.sucesso) {
        alert(resposta.mensagem || "Erro ao deletar conta.");
        setDeletando(false);
        return false;
      }

      console.log("5. [HOOK] Sucesso! Redirecionando para o login...");
      router.push("/login-usuario"); 
      return true;
      
    } catch (error) {
      console.error("[HOOK] Erro fatal:", error);
      alert("Ocorreu um erro inesperado.");
      setDeletando(false);
      return false;
    }
  };

  return { deletarConta, deletando };
}