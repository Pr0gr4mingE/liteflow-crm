import { Metadata } from "next";
import { PerfilFeature } from "@/components/features/perfil/perfil";

export const metadata: Metadata = {
  title: "Meu Perfil | LiteFlow CRM",
  description: "Visualize e gerencie seus dados de usuário.",
};

export default function PerfilPage() {
  return (
    <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
      <PerfilFeature />
    </main>
  );
}