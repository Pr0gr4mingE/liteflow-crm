"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCadastro } from "@/hooks/cadastro/use-cadastro.hook";
import { OPCOES_CARGOS } from "@/shared/utils/constantes/cargos";

export function FormCadastro() {
  // Consumindo o cérebro que criamos no passo 2
  const { handleSubmit, carregando, mensagem } = useCadastro();

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-4">
      <div>
        <Label htmlFor="nome">Nome completo</Label>
        <Input id="nome" name="nome" type="text" placeholder="João da Silva" required disabled={carregando} />
      </div>

      <div>
        <Label htmlFor="cpf">CPF</Label>
        <Input id="cpf" name="cpf" type="text" placeholder="000.000.000-00" required disabled={carregando} />
      </div>

      <div>
        <Label htmlFor="email">E-mail profissional</Label>
        <Input id="email" name="email" type="email" placeholder="joao@empresa.com" required disabled={carregando} />
      </div>

      <div>
        <Label htmlFor="password">Criar uma senha</Label>
        <Input id="password" name="password" type="password" placeholder="Mínimo 8 caracteres" required disabled={carregando} />
      </div>

      <div>
        <Label htmlFor="cargo">Cargo</Label>
        <select id="cargo" name="cargo" required disabled={carregando} className="...">
        <option value="" disabled>Selecione seu cargo</option>
        
        {/* Renderização limpa e escalável */}
        {OPCOES_CARGOS.map((cargo) => (
          <option key={cargo.valor} value={cargo.valor}>
            {cargo.rotulo}
          </option>
        ))}
      </select>
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full" disabled={carregando}>
          {carregando ? "Criando conta..." : "Criar conta grátis"}
        </Button>
      </div>

      {/* Exibe o feedback da API caso exista */}
      {mensagem && (
        <p className={`text-sm text-center font-medium mt-3 ${mensagem.includes("sucesso") ? "text-green-600" : "text-red-500"}`}>
          {mensagem}
        </p>
      )}
    </form>
  );
}