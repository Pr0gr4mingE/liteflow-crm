"use client";

import Link from "next/link";
import { Plus, Search, RefreshCw } from "lucide-react";
import { useNegociacoes } from "@/hooks/listagem/negociacoes/use-negociacoes.hook";
import { NegociacoesLista } from "./negociacoes-lista";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NegociacoesFeature() {
  const {
    tipoNegociacao,
    setTipoNegociacao,
    busca,
    setBusca,
    negociacoes,
    total,
    carregando,
    erro,
    refetch,
  } = useNegociacoes();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Negociações</h1>
          <p className="text-sm text-slate-500">
            Acompanhe oportunidades PF e PJ da sua carteira.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex w-max items-center gap-2 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setTipoNegociacao("PF")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tipoNegociacao === "PF"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Pessoa Física (B2C)
            </button>
            <button
              type="button"
              onClick={() => setTipoNegociacao("PJ")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tipoNegociacao === "PJ"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Pessoa Jurídica (B2B)
            </button>
          </div>

          <Link href="/ativos">
            <Button type="button" className="gap-2">
              <Plus className="h-4 w-4" />
              Nova negociação
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por título, cliente, fase ou valor..."
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            {carregando
              ? "Carregando..."
              : `${negociacoes.length} de ${total} ${total === 1 ? "negociação" : "negociações"}`}
          </span>

          <button
            type="button"
            onClick={refetch}
            disabled={carregando}
            aria-label="Atualizar lista de negociações"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${carregando ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {erro && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{erro}</p>
          <button
            type="button"
            onClick={refetch}
            className="text-sm font-medium text-red-700 hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      <NegociacoesLista
        tipoNegociacao={tipoNegociacao}
        negociacoes={negociacoes}
        carregando={carregando}
        busca={busca}
      />
    </div>
  );
}
