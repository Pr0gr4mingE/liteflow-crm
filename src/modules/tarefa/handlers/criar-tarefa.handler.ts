import { capitalizarTexto } from "@/shared/utils/formatacao/capitalizar-texto.util";
import { CriarTarefaDTO } from "../dto/criar-tarefa.dto";
import { RespostaTarefaDTO } from "../dto/resposta-tarefa.dto";
import { CriarTarefaUseCase } from "../use-cases/criar-tarefa.use-case";
import { rehidratarData } from "@/shared/utils/formatacao/rehidratar-data.util";

export class CriarTarefaHandler {
  constructor(private readonly criarTarefaUseCase: CriarTarefaUseCase) {}

  async handle(dadosEntrada: CriarTarefaDTO): Promise<RespostaTarefaDTO> {
    try {
      // 1. Reidrata a data e isola em uma variável
      const dataRehidratada = rehidratarData(dadosEntrada.dataVencimento);

      // 2. Validação: O TypeScript agora entende que, se passar daqui, a data é 100% válida
      if (!dataRehidratada) {
        return { sucesso: false, mensagem: "Data de vencimento inválida ou ausente." };
      }

      const dadosFormatados: CriarTarefaDTO = {
        ...dadosEntrada,
        titulo: capitalizarTexto(dadosEntrada.titulo),
        dataVencimento: dataRehidratada, // O erro some aqui!
      };

      return await this.criarTarefaUseCase.execute(dadosFormatados);

    } catch (error: unknown) {
      console.error("[CriarTarefaHandler] Erro na orquestração:", error);
      return { sucesso: false, mensagem: "Erro na orquestração dos dados ao criar tarefa." };
    }
  }
}