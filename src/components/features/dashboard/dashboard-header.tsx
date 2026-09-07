"use client";

type TipoFunil = "TODOS" | "PF" | "PJ";

interface DashboardHeaderProps {
  tipoFunil: TipoFunil;
  setTipoFunil: (tipo: TipoFunil) => void;
  carregando: boolean;
}

export function DashboardHeader({ tipoFunil, setTipoFunil, carregando }: DashboardHeaderProps) {
  const abas: { label: string; valor: TipoFunil }[] = [
    { label: "Visão Geral", valor: "TODOS" },
    { label: "Pessoa Física (B2C)", valor: "PF" },
    { label: "Pessoa Jurídica (B2B)", valor: "PJ" },
  ];

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Acompanhe suas métricas, tarefas e negociações em andamento.
        </p>
      </div>

      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        {abas.map((aba) => (
          <button
            key={aba.valor}
            onClick={() => setTipoFunil(aba.valor)}
            disabled={carregando}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
              ${tipoFunil === aba.valor 
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm" 
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
              }
              ${carregando ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {aba.label}
          </button>
        ))}
      </div>
    </header>
  );
}