import { Usuario } from "@/shared/types/domain/agentes/IUsuario";

export type AtualizarUsuarioDTO = Partial<Pick<Usuario, "cpf" | "nome" | "email" | "cargo">>;