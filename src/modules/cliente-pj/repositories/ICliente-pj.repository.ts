import { CriarClientePjDTO } from "../dto/criar-cliente-pj.dto";
import { ClientePj } from "@/shared/types/domain/ativos/clientes/ICliente-pj";
import { SegmentoEmpresa } from "@/shared/utils/types/segmento-empresa.type";

export interface IClientePjRepository {
  salvar(dados: CriarClientePjDTO): Promise<ClientePj>;
  
  // Atualizações
  atualizar(id: string, dados: Partial<CriarClientePjDTO>): Promise<void>;

  // Buscas Únicas
  buscarPorId(id: string): Promise<ClientePj | null>;
  buscarPorCnpj(cnpj: string): Promise<ClientePj | null>;
  buscarPorEmail(email: string): Promise<ClientePj | null>;
  
  // Buscas em Lista
  buscarPorRazaoSocial(razaoSocial: string): Promise<ClientePj[]>;
  buscarPorNomeFantasia(nomeFantasia: string): Promise<ClientePj[]>;
  buscarPorSegmento(segmento: SegmentoEmpresa): Promise<ClientePj[]>;
  listarPorUsuarioId(usuarioId: string): Promise<ClientePj[]>;

  // exclusões
  deletar(id: string): Promise<boolean>;
}