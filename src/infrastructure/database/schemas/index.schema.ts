import { clientesPfTable } from "./cliente-pf.schema";
import { clientesPjTable } from "./cliente-pj.schema";
import { negociacoesPfTable } from "./negociacao-pf.schema";
import { negociacoesPjTable } from "./negociacao-pj.schema";
import { tarefasTable } from "./tarefa.schema";
import { usuariosTable } from "./usuario.schema";

// Agrupa todas as tabelas num único objeto de schema
export const schema = {
  clientesPfTable,
  clientesPjTable,
  negociacoesPfTable,
  negociacoesPjTable,
  tarefasTable,
  usuariosTable
};