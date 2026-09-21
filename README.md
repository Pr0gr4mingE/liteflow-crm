# 💼 Liteflow CRM
### Next.js 16 · Drizzle ORM · PostgreSQL · Tailwind 4 · Playwright · Jest

<img src="https://img.shields.io/badge/Status-Fase_de_Deploy-2EA043?style=flat-square" /> <img src="https://img.shields.io/badge/Arquitetura-Desacoplada_Orientada_a_Features-E9711C?style=flat-square" /> <img src="https://img.shields.io/badge/Banco-PostgreSQL-3FCF8E?style=flat-square" /> <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square" /> <img src="https://img.shields.io/badge/Testes-Triade_Metodologica-1C71E9?style=flat-square" />

<img src="https://img.shields.io/badge/Next.js-16.3.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" /> <img src="https://img.shields.io/badge/PostgreSQL-pg-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" /> <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /> <img src="https://img.shields.io/badge/Playwright-1.50-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" /> <img src="https://img.shields.io/badge/Jest-29.7-C21325?style=for-the-badge&logo=jest&logoColor=white" />

---

O **Liteflow CRM** é um sistema moderno de gestão de ativos, negociações e carteiras de clientes (PF e PJ). Construído sob uma arquitetura rigorosamente desacoplada e fortemente tipada, o projeto garante qualidade de ponta a ponta através de testes automatizados e separação estrita de responsabilidades entre Server Actions, Hooks, Infraestrutura e UI.

---

## 1. Tecnologias Usadas
O ecossistema do projeto foi selecionado para garantir alta performance, segurança no servidor, testes escaláveis e tipagem estrita de ponta a ponta.

| Camada | Tecnologia | Versão | Propósito |
|--------|-----------|--------|-----------|
| **Framework Base** | Next.js (App Router) | `16.3.3` | Roteamento, SSR e Server Actions |
| **Linguagem** | TypeScript | `^5` | Tipagem estrita e contratos de dados |
| **ORM** | Drizzle ORM | `^0.45.2` | Mapeamento relacional e queries tipadas |
| **Banco de Dados** | `pg` (node-postgres) | `^8.23.0` | Comunicação com o PostgreSQL |
| **Estilização** | Tailwind CSS | `^4.3.3` | Estilos utilitários de alta performance |
| **Testes E2E** | Playwright | `^1.50.1` | Automação e testes de ponta a ponta em navegador real |
| **Testes Unit/Int.** | Jest & RTL | `^29.7.0` | Testes unitários puros e integração de componentes UI |
| **Interatividade** | `@hello-pangea/dnd` | `^18.0.1` | Funcionalidades de Drag and Drop (Kanban) |

---

## 2. A Arquitetura Desacoplada
O projeto adota uma estrutura de pastas orientada a domínio e responsabilidade. A pasta `src/` está organizada alfabeticamente para facilitar a navegação. Componentes visuais não acessam o banco, lógicas de mutação não ficam presas às páginas, e as suítes de teste são separadas por domínio.

```text
/
├── src/
│   ├── actions/        # Server Actions (rodando estritamente no servidor)
│   ├── app/            # Roteamento e páginas de entrada do Next.js (App Router)
│   ├── assets/         # Arquivos estáticos como imagens, ícones e recursos visuais
│   ├── components/     # Componentes React (separados entre 'ui' genérica e 'features' complexas)
│   ├── hooks/          # Hooks customizados (mutações, controle de UI, listagens)
│   ├── infrastructure/ # Configurações de banco (Drizzle), adaptadores e clientes externos
│   ├── modules/        # Regras de negócio centrais, serviços isolados e lógica de domínio
│   └── shared/         # Tipos globais, DTOs, utilitários puros e constantes compartilhadas
│
└── tests/              # Suíte nativa do Playwright (Testes E2E isolados do src/)
```

**Regras de Ouro da Arquitetura:**
1. **Componentes UI** apenas recebem props e emitem eventos. Não conhecem estado de servidor.
2. **Features** são o "cimento": importam os Hooks de mutação, gerenciam o loading e injetam os dados na UI.
3. **Hooks** tratam exceções, controlam o ciclo de vida e orquestram a interface visual sem prender lógicas nos modais.
4. **Actions e Infrastructure** são as únicas camadas autorizadas a processar regras de negócio no backend e interagir com o PostgreSQL.

---

## 3. Qualidade e Testes (Tríade Metodológica)
O Lite Flow é blindado por testes automatizados em três níveis (Unitário, Integração e E2E), seguindo a **Tríade Metodológica** de cenários:

- **[Verde/Positivo]:** O Caminho Feliz. Dados perfeitos resultam em sucesso validado.
- **[Vermelho/Positivo]:** A Defesa. O sistema recebe lixo/dados faltantes e bloqueia a ação corretamente, gerando alertas controlados.
- **[Verde/Negativo]:** O Fallback. O banco retorna nulo ou vazio, e a interface processa de forma graciosa (sem quebrar a tela).

### Rodando os Testes

**Testes Unitários e Integração (Jest)**
Localizados na pasta `src/` ao lado dos componentes testados (arquivos `*.test.tsx`).
```bash
npm run test          # Roda a suíte completa uma vez
npm run test:watch    # Roda em background focado nos arquivos alterados
npm run test:cov      # Exibe a tabela de cobertura (Coverage)
```

**Testes E2E (Playwright)**
Localizados na raiz, na pasta `tests/`. Garantem a saúde dos formulários, navegação e segurança (Autenticação, Clientes, Tarefas).
```bash
# IMPORTANTE: O Next.js (npm run dev) deve estar rodando em outro terminal
npm run test:e2e      # Roda os fluxos invisivelmente no terminal
npm run test:e2e:ui   # Abre a interface gráfica interativa do Playwright
```

---

## 4. Variáveis de Ambiente
O projeto exige configurações de ambiente para rodar. Crie um arquivo `.env` na raiz do projeto, baseado no modelo abaixo:

```env
# URL da API de Backend (se houver comunicação externa)
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Conexão com o Banco de Dados (usada pelo Drizzle / PostgreSQL)
DATABASE_URL="postgresql://usuario:senha@host:porta/banco"
```

> **Aviso de Segurança:** Nunca versione o arquivo `.env`. Nenhuma variável crítica (como banco de dados ou tokens de acesso) deve possuir o prefixo `NEXT_PUBLIC_`.

---

## 5. Configuração e Execução Local
Siga os passos abaixo para rodar o CRM em sua máquina:

1. **Instale as dependências:**
```bash
npm install
```

2. **Gere as tipagens e o schema do banco:**
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```
O sistema estará disponível em http://localhost:3000.

---

## 6. Checklist de Segurança e Boas Práticas
- [x] O componente `ConfirmarExclusaoModal` foi totalmente testado isoladamente via Jest/RTL.
- [x] Utilitários puros (telefone, CPF, moedas) possuem cláusulas de guarda contra quebras (NPEs).
- [x] Selects de entidades pesadas (Clientes/Empresas) migraram para Autocompletes baseados em dropdown, gerando melhor UX.
- [x] Testes E2E mapeiam o DOM exato sem dependências genéricas, focando em rótulos acessíveis.
- [x] Erros capturados em blocos `try/catch` são estritamente tipados como `unknown`, exigindo verificação prévia.