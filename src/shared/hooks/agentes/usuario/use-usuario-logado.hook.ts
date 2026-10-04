import { useState, useEffect } from "react";
import { buscarUsuarioLogadoAction, type UsuarioPerfil } from "@/actions/usuario/buscar-usuario-logado.action";

export function useUsuarioLogado() {
  const [usuario, setUsuario] = useState<UsuarioPerfil | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const dados = await buscarUsuarioLogadoAction();
        setUsuario(dados);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setCarregando(false);
      }
    }

    // Busca inicial
    carregarPerfil();

    // Listener para atualizações externas (como a edição de perfil)
    window.addEventListener('perfilAtualizado', carregarPerfil);

    return () => window.removeEventListener('perfilAtualizado', carregarPerfil);
  }, []);

  return { usuario, carregando };
}