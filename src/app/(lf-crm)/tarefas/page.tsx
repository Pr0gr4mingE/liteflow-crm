import { Metadata } from "next";
import { TarefasFeature } from "@/components/features/tarefas/tarefas";

export const metadata: Metadata = {
  title: "Tarefas | LiteFlow CRM",
  description: "Gerencie seus follow-ups, reuniões e ações comerciais.",
};

export default function TarefasPage() {
  return (
    <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
      <TarefasFeature />
    </main>
  );
}