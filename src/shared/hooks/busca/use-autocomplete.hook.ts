import { useState } from "react";

export function useAutocomplete<T>(
  itens: T[],
  extratorTexto: (item: T) => string,
  extratorId: (item: T) => string
) {
  const [busca, setBusca] = useState("");
  const [idSelecionado, setIdSelecionado] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const itensFiltrados = itens.filter((item) =>
    extratorTexto(item).toLowerCase().includes(busca.toLowerCase())
  );

  const handleSelecionar = (id: string) => {
    setIdSelecionado(id);
    setBusca("");
    setIsOpen(false);
  };

  const getValorInput = () => {
    if (idSelecionado) {
      const item = itens.find((i) => extratorId(i) === idSelecionado);
      return item ? extratorTexto(item) : busca;
    }
    return busca;
  };

  return {
    busca,
    setBusca,
    idSelecionado,
    setIdSelecionado, // Exposto caso precise resetar externamente
    isOpen,
    setIsOpen,
    itensFiltrados,
    handleSelecionar,
    getValorInput,
  };
}