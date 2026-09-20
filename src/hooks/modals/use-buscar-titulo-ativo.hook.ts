import { useState, useEffect } from "react";

// Imports baseados na estrutura de buscar-ativos[cite: 2]
import { listarTarefasAction } from "@/actions/ativos/buscar-ativos/tarefas/listar-tarefa.action";
import { listarClientesPfAction } from "@/actions/ativos/buscar-ativos/clientes/listar-cliente-pf.action";
import { listarClientesPjAction } from "@/actions/ativos/buscar-ativos/clientes/listar-cliente-pj.action";
import { listarNegociacoesPfAction } from "@/actions/ativos/buscar-ativos/negociacoes/listar-negociacao-pf.action";
import { listarNegociacoesPjAction } from "@/actions/ativos/buscar-ativos/negociacoes/listar-negociacao-pj.action";

export type TipoAtivo = "tarefa" | "cliente-pf" | "cliente-pj" | "negociacao-pf" | "negociacao-pj";

export function useBuscarTituloAtivo(id: string | null, tipoAtivo: TipoAtivo) {
  const [titulo, setTitulo] = useState<string | null>(null);
  const [carregandoTitulo, setCarregandoTitulo] = useState(false);

  useEffect(() => {
    let montado = true;

    async function buscar() {
      // 1. Resolvemos a condicional de ID nulo dentro da função (evita o erro síncrono na raiz do effect)
      if (!id) {
        if (montado) setTitulo(null);
        return;
      }

      if (montado) setCarregandoTitulo(true);

      try {
        let tituloEncontrado = null;

        switch (tipoAtivo) {
          case "tarefa": {
            const tarefas = await listarTarefasAction();
            tituloEncontrado = tarefas.find(t => t.id === id)?.titulo || "Tarefa Desconhecida";
            break;
          }
          case "cliente-pf": {
            const clientes = await listarClientesPfAction();
            tituloEncontrado = clientes.find(c => c.id === id)?.nome || "Cliente Desconhecido";
            break;
          }
          case "cliente-pj": {
            const empresas = await listarClientesPjAction();
            tituloEncontrado = empresas.find(c => c.id === id)?.razaoSocial || "Empresa Desconhecida";
            break;
          }
          case "negociacao-pf": {
            const negociacoesPf = await listarNegociacoesPfAction();
            tituloEncontrado = negociacoesPf.find(n => n.id === id)?.titulo || "Negociação Desconhecida";
            break;
          }
          case "negociacao-pj": {
            const negociacoesPj = await listarNegociacoesPjAction();
            tituloEncontrado = negociacoesPj.find(n => n.id === id)?.titulo || "Negociação Corporativa Desconhecida";
            break;
          }
        }

        if (montado) setTitulo(tituloEncontrado);
      } catch (error: unknown) {
        console.error(`[Hook Error - Buscar Título] Falha ao buscar ativo ${tipoAtivo}:`, error);
        if (montado) setTitulo("Erro ao carregar título");
      } finally {
        if (montado) setCarregandoTitulo(false);
      }
    }

    buscar();

    // Cleanup function: se o ID mudar ou o componente desmontar antes do fetch terminar, invalida as atualizações de estado
    return () => {
      montado = false;
    };
  }, [id, tipoAtivo]);

  return { titulo, carregandoTitulo };
}