// src/components/ui/toast-feedback.tsx
import { CheckCircle2 } from "lucide-react";

interface ToastFeedbackProps {
  mensagem: string | null;
}

export function ToastFeedback({ mensagem }: ToastFeedbackProps) {
  if (!mensagem) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg animate-in fade-in slide-in-from-bottom-4">
      <CheckCircle2 className="h-5 w-5 text-emerald-100" />
      {mensagem}
    </div>
  );
}