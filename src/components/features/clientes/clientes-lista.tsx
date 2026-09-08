import { Mail, Phone, Building2, User } from "lucide-react";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";
import { TipoCliente } from "@/hooks/clientes/use-clientes.hook";
import { formatarDataPtBr } from "@/shared/utils/formatacao/formatar-data-ptbr.util";

interface ClientesListaProps {
  tipoCliente: TipoCliente;
  clientes: ClientePf[] | ClientePj[];
  carregando: boolean;
  busca: string;
}

function formatarCpf(cpf: string) {
  const digitos = cpf.replace(/\D/g, "");
  if (digitos.length !== 11) return cpf;
  return digitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarCnpj(cnpj: string) {
  const digitos = cnpj.replace(/\D/g, "");
  if (digitos.length !== 14) return cnpj;
  return digitos.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function formatarTelefone(telefone: string) {
  const digitos = telefone.replace(/\D/g, "");
  if (digitos.length === 11) {
    return digitos.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (digitos.length === 10) {
    return digitos.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return telefone;
}

function SkeletonLista() {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <li
          key={index}
          className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 h-5 w-1/3 animate-pulse rounded bg-slate-200" />
          <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        </li>
      ))}
    </ul>
  );
}

export function ClientesLista({
  tipoCliente,
  clientes,
  carregando,
  busca,
}: ClientesListaProps) {
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
    <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm md:p-6">
      <ul className="space-y-3">
        {tipoCliente === "PF"
          ? (clientes as ClientePf[]).map((cliente) => (
              <li
                key={cliente.id}
                className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 shrink-0 text-slate-500" />
                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {cliente.nome}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-500">
                      CPF: {formatarCpf(cliente.cpf)}
                    </p>

                    <div className="flex flex-col gap-1.5 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-4">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        {cliente.email}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {formatarTelefone(cliente.telefone)}
                      </span>
                    </div>
                  </div>

                  <span className="shrink-0 text-xs text-slate-400">
                    Desde {formatarDataPtBr(cliente.dataCriacao)}
                  </span>
                </div>
              </li>
            ))
          : (clientes as ClientePj[]).map((cliente) => (
              <li
                key={cliente.id}
                className="rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 shrink-0 text-slate-500" />
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-slate-900">
                          {cliente.razaoSocial}
                        </h3>
                        <p className="truncate text-xs text-slate-500">
                          {cliente.nomeFantasia}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500">
                      CNPJ: {formatarCnpj(cliente.cnpj)}
                      {cliente.segmento ? ` · ${cliente.segmento}` : ""}
                    </p>

                    <div className="flex flex-col gap-1.5 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-4">
                      <span className="inline-flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        {cliente.email}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {formatarTelefone(cliente.telefone)}
                      </span>
                    </div>
                  </div>

                  <span className="shrink-0 text-xs text-slate-400">
                    Desde {formatarDataPtBr(cliente.dataCriacao)}
                  </span>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
}
