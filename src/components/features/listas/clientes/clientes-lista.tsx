import { useState } from "react";
import { Mail, Phone, Building2, User, Pencil, Trash2 } from "lucide-react"; // Adicionado Trash2
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";
import { TipoCliente } from "@/hooks/listagem/clientes/use-clientes.hook";
import { formatarDataPtBr } from "@/shared/utils/formatacao/formatar-data-ptbr.util";
import { formatarCpf } from "@/shared/utils/formatacao/formatar-cpf.util";
import { formatarCnpj } from "@/shared/utils/formatacao/formatar-cnpj.util";
import { formatarTelefone } from "@/shared/utils/formatacao/formatar-telefone.util";

import { EditarClientePfFeature } from "@/components/features/ativos/edit-clientes/editar-cliente-pf";
import { EditarClientePjFeature } from "@/components/features/ativos/edit-clientes/editar-cliente-pj";
// Imports das novas features de exclusão
import { DeletarClientePfFeature } from "@/components/features/ativos/deletar-clientes/deletar-cliente-pf";
import { DeletarClientePjFeature } from "@/components/features/ativos/deletar-clientes/deletar-cliente-pj";

import { useFeedback } from "@/shared/hooks/ui/use-feedback.hook";
import { ToastFeedback } from "@/components/ui/feedback/toast-feedback";

interface ClientesListaProps {
  tipoCliente: TipoCliente;
  clientes: ClientePf[] | ClientePj[];
  carregando: boolean;
  busca: string;
  onAtualizar: () => void;
}

function SkeletonLista() {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <li key={index} className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm">
          <div className="mb-3 h-5 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        </li>
      ))}
    </ul>
  );
}

export function ClientesLista({ tipoCliente, clientes, carregando, busca, onAtualizar }: ClientesListaProps) {
  const [clientePfEditando, setClientePfEditando] = useState<ClientePf | null>(null);
  const [clientePjEditando, setClientePjEditando] = useState<ClientePj | null>(null);
  
  // Novos estados para exclusão (apenas o ID)
  const [clientePfDeletandoId, setClientePfDeletandoId] = useState<string | null>(null);
  const [clientePjDeletandoId, setClientePjDeletandoId] = useState<string | null>(null);
  
  const { mensagem, mostrarSucesso } = useFeedback();

  function handleSucessoPf() {
    setClientePfEditando(null);
    mostrarSucesso("Cliente Pessoa Física atualizado");
    onAtualizar();
  }

  function handleSucessoPj() {
    setClientePjEditando(null);
    mostrarSucesso("Empresa atualizada");
    onAtualizar();
  }

  // Handlers de sucesso para exclusão
  function handleSucessoDeletarPf() {
    setClientePfDeletandoId(null);
    mostrarSucesso("Cliente Pessoa Física excluído");
    onAtualizar();
  }

  function handleSucessoDeletarPj() {
    setClientePjDeletandoId(null);
    mostrarSucesso("Empresa excluída");
    onAtualizar();
  }

  if (carregando) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-100 p-6 shadow-sm">
        <SkeletonLista />
      </div>
    );
  }

  if (clientes.length === 0) {
    return (
      <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          {busca.trim()
            ? "Nenhum cliente encontrado para a busca informada."
            : tipoCliente === "PF"
              ? "Nenhum cliente pessoa física cadastrado."
              : "Nenhuma empresa cadastrada."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm md:p-6">
        <ul className="space-y-3">
          {tipoCliente === "PF"
            ? (clientes as ClientePf[]).map((cliente) => (
                <li key={cliente.id} className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm transition-hover hover:border-blue-300">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 shrink-0 text-slate-500" />
                        <h3 className="truncate text-sm font-semibold text-slate-900">{cliente.nome}</h3>
                      </div>
                      <p className="text-xs text-slate-500">CPF: {formatarCpf(cliente.cpf)}</p>
                      <div className="flex flex-col gap-1.5 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-4">
                        <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-slate-400" />{cliente.email}</span>
                        <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-slate-400" />{formatarTelefone(cliente.telefone)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                      <span className="hidden sm:inline text-xs text-slate-400">Desde {formatarDataPtBr(cliente.dataCriacao)}</span>
                      <button 
                        onClick={() => setClientePfEditando(cliente)}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Editar Cliente"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      {/* Novo Botão de Excluir */}
                      <button 
                        onClick={() => setClientePfDeletandoId(cliente.id)}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Excluir Cliente"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))
            : (clientes as ClientePj[]).map((cliente) => (
                <li key={cliente.id} className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm transition-hover hover:border-blue-300">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 shrink-0 text-slate-500" />
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-slate-900">{cliente.razaoSocial}</h3>
                          <p className="truncate text-xs text-slate-500">{cliente.nomeFantasia}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">CNPJ: {formatarCnpj(cliente.cnpj)} {cliente.segmento ? ` · ${cliente.segmento}` : ""}</p>
                      <div className="flex flex-col gap-1.5 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-4">
                        <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-slate-400" />{cliente.email}</span>
                        <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-slate-400" />{formatarTelefone(cliente.telefone)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                      <span className="hidden sm:inline text-xs text-slate-400">Desde {formatarDataPtBr(cliente.dataCriacao)}</span>
                      <button 
                        onClick={() => setClientePjEditando(cliente)}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Editar Empresa"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      {/* Novo Botão de Excluir */}
                      <button 
                        onClick={() => setClientePjDeletandoId(cliente.id)}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Excluir Empresa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
        </ul>
      </div>

      <EditarClientePfFeature
        isOpen={!!clientePfEditando}
        onClose={() => setClientePfEditando(null)}
        onSuccess={handleSucessoPf}
        clienteSelecionado={clientePfEditando as ClientePf}
      />
      
      <EditarClientePjFeature
        isOpen={!!clientePjEditando}
        onClose={() => setClientePjEditando(null)}
        onSuccess={handleSucessoPj}
        clienteSelecionado={clientePjEditando as ClientePj}
      />

      {/* Novas Features de Deleção */}
      <DeletarClientePfFeature
        isOpen={!!clientePfDeletandoId}
        onClose={() => setClientePfDeletandoId(null)}
        onSuccess={handleSucessoDeletarPf}
        clienteId={clientePfDeletandoId}
      />

      <DeletarClientePjFeature
        isOpen={!!clientePjDeletandoId}
        onClose={() => setClientePjDeletandoId(null)}
        onSuccess={handleSucessoDeletarPj}
        clienteId={clientePjDeletandoId}
      />

      <ToastFeedback mensagem={mensagem} />
    </>
  );
}