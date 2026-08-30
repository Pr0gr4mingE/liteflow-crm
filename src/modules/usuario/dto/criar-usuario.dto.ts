import { Usuario } from "@/shared/types/domain/agentes/IUsuario";

export type CriarUsuarioDTO = Omit<
  Usuario,
  "id" | "dataCriacao" | "dataAtualizacao"
>;