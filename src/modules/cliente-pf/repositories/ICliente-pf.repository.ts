import { CriarClientePfDTO } from "../dto/criar-cliente-pf.dto";
import { ClientePf } from "@/shared/types/domain/ativos/clientes/ICliente-pf"; 

export interface IClientePfRepository {
  salvar(dados: CriarClientePfDTO): Promise<ClientePf>;
  
  // Buscas Únicas
  buscarPorId(id: string): Promise<ClientePf | null>;
  buscarPorCpf(cpf: string): Promise<ClientePf | null>;
  buscarPorEmail(email: string): Promise<ClientePf | null>; 
  
  // Buscas em Lista
  buscarPorNome(nome: string): Promise<ClientePf[]>;
  buscarPorTelefone(telefone: string): Promise<ClientePf[]>;
}