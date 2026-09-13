"use client";

import { User, Mail, FileText, Briefcase } from "lucide-react";
import { usePerfil } from "@/hooks/usuario/use-perfil.hook";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SkeletonPerfil() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-1/3 rounded bg-slate-200" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-12 rounded bg-slate-200" />
        <div className="h-12 rounded bg-slate-200" />
        <div className="h-12 rounded bg-slate-200" />
        <div className="h-12 rounded bg-slate-200" />
      </div>
    </div>
  );
}

export function PerfilFeature() {
  const { usuario, carregando, erro } = usePerfil();

  if (carregando) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <SkeletonPerfil />
      </div>
    );
  }

  if (erro || !usuario) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600 font-medium">{erro || "Usuário não encontrado."}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Meu Perfil</h1>
        <p className="text-sm text-slate-500">
          Visualize e gerencie suas informações pessoais.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800">Dados Pessoais</h2>
        </div>
        
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Nome */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  Nome Completo
                </label>
                <Input 
                  value={usuario.nome} 
                  readOnly 
                  className="bg-slate-50 text-slate-600 focus-visible:ring-0"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  E-mail
                </label>
                <Input 
                  value={usuario.email} 
                  readOnly 
                  className="bg-slate-50 text-slate-600 focus-visible:ring-0"
                />
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-400" />
                  CPF
                </label>
                <Input 
                  value={usuario.cpf} 
                  readOnly 
                  className="bg-slate-50 text-slate-600 focus-visible:ring-0"
                />
              </div>

              {/* Cargo */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  Cargo
                </label>
                <Input 
                  value={usuario.cargo.replace(/_/g, " ")} 
                  readOnly 
                  className="bg-slate-50 text-slate-600 capitalize focus-visible:ring-0"
                />
              </div>

            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <Button type="button" disabled>
                Editar Perfil
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}