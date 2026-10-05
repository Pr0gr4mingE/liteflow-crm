import { IUsuarioRepository } from "../repositories/IUsuario.repository";

export class DeletarContaUseCase {
  constructor(private usuarioRepository: IUsuarioRepository) {}

  async executar(id: string): Promise<void> {
    if (!id) {
      throw new Error("ID do usuário é obrigatório para a exclusão.");
    }

    // 1. Valida se o usuário ainda existe no banco
    const usuarioExiste = await this.usuarioRepository.buscarPorId(id);
    if (!usuarioExiste) {
      throw new Error("Usuário não encontrado ou já deletado.");
    }

    // 2. Aciona a deleção em cascata (Conta + Ativos PF/PJ + Tarefas)
    try {
      await this.usuarioRepository.deletarComAtivos(id);
    } catch (error) {
      console.error(`[DeletarContaUseCase] Erro ao deletar usuário ${id}:`, error);
      throw new Error("Falha interna ao excluir a conta e os ativos vinculados.");
    }
  }
}