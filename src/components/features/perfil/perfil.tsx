"use client";

import { useState } from "react";
import { User, Mail, FileText, Briefcase, Check, X, Edit2 } from "lucide-react";
import { usePerfil } from "@/hooks/usuario/use-perfil.hook";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AtualizarUsuarioDTO } from "@/modules/usuario/dto/atualizar-usuario.dto";

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
  const { usuario, carregando, salvando, erro, mensagemSucesso, atualizarPerfil } = usePerfil();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AtualizarUsuarioDTO>({});

  if (carregando) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <SkeletonPerfil />
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600 font-medium">{erro || "Usuário não encontrado."}</p>
      </div>
    );
  }

  const handleEdit = () => {
    // Preenche o formulário com os dados atuais ao entrar no modo edição
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filtra apenas o que realmente mudou para enviar à API (afinal, o PATCH é parcial)
    const mudancas: AtualizarUsuarioDTO = {};
    if (formData.nome !== usuario.nome) mudancas.nome = formData.nome;
    if (formData.email !== usuario.email) mudancas.email = formData.email;
    if (formData.cpf !== usuario.cpf) mudancas.cpf = formData.cpf;

    // Se não houver mudanças, só fecha a edição
    if (Object.keys(mudancas).length === 0) {
      setIsEditing(false);
      return;
    }

    const sucesso = await atualizarPerfil(mudancas);
    if (sucesso) {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex h-full flex-col max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Meu Perfil</h1>
        <p className="text-sm text-slate-500">
          Visualize e atualize suas informações pessoais.
        </p>
      </div>

      {mensagemSucesso && !isEditing && (
        <div className="mb-4 rounded-md bg-green-50 p-4 border border-green-200">
          <p className="text-sm font-medium text-green-800">{mensagemSucesso}</p>
        </div>
      )}

      {erro && (
        <div className="mb-4 rounded-md bg-red-50 p-4 border border-red-200">
          <p className="text-sm font-medium text-red-800">{erro}</p>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Dados Pessoais</h2>
          {!isEditing && (
            <Button onClick={handleEdit} variant="outline" size="sm" className="gap-2">
              <Edit2 className="h-4 w-4" />
              Editar
            </Button>
          )}
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Nome */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  Nome Completo
                </label>
                <Input 
                  value={isEditing ? formData.nome : usuario.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-slate-50 text-slate-600 focus-visible:ring-0 border-transparent shadow-none" : ""}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  E-mail
                </label>
                <Input 
                  value={isEditing ? formData.email : usuario.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-slate-50 text-slate-600 focus-visible:ring-0 border-transparent shadow-none" : ""}
                />
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-400" />
                  CPF
                </label>
                <Input 
                  value={isEditing ? formData.cpf : usuario.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-slate-50 text-slate-600 focus-visible:ring-0 border-transparent shadow-none" : ""}
                />
              </div>

              {/* Cargo (Sempre travado) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  Cargo
                </label>
                <Input 
                  value={usuario.cargo.replace(/_/g, " ")} 
                  readOnly 
                  className="bg-slate-50 text-slate-600 capitalize focus-visible:ring-0 border-transparent shadow-none cursor-not-allowed"
                />
              </div>

            </div>

            {/* Ações do Formulário (Só aparece no modo edição) */}
            {isEditing && (
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={salvando}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={salvando}
                  className="gap-2"
                >
                  {salvando ? "Salvando..." : (
                    <>
                      <Check className="h-4 w-4" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}