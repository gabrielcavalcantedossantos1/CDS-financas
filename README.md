# CDS Finanças

Projeto de gestão financeira pessoal com foco em usabilidade, performance e responsividade.

## Visão geral

O aplicativo permite um usuário autenticado visualizar um dashboard financeiro, controlar transações e atualizar dados da conta.

Funcionalidades principais:

- Dashboard com métricas: saldo atual, pendentes e concluídos
- Filtro por mês e ano
- Cadastro/edição/exclusão de transações
- Pesquisa de transações (input de busca)
- Paginação de transações
- Página de gerenciamento de conta (editar nome/email, excluir conta)
- Autenticação e proteção de rotas via middleware
- Tema claro/escuro
- Responsividade até 320px (Redmi, celulares compactos)

## Estrutura do projeto

- `src/components`: componentes reutilizáveis (botões, alertas, inputs, layout)
- `src/pages`: páginas do aplicativo (Home, Transações, Contas, Auth)
- `src/redux`: store e slices de estado
- `src/services`: requisições HTTP (API)
- `src/themes`: temas claro e escuro
- `src/utils`: funções auxiliares (formatar valor/data, mensagem de erro)

## Tecnologias usadas

- React 19
- TypeScript
- Vite
- Redux Toolkit
- Styled Components
- React Router Dom
- Axios
- react-icons
- react-spinners

## Mobile (Redmi) e responsividade

A interface inclui suporte completo para telas pequenas:

- `max-width: 420px` e `max-width: 768px` para layouts ajustados
- sidebar móvel reduzida a ícone e expande ao tocar
- cartões do dashboard com padding reduzido e layout em coluna
- tabela de transações com `overflow-x: auto` e cells adaptativos
- input de pesquisa maiores e estilo touch-friendly
- botões full-width na página de conta

## Como executar localmente

1. `npm install`
2. `npm run dev` (inicia servidor dev no `localhost:5173`)
3. `npm run build` (build de produção)
4. `npm run preview` (pré-visualiza o build)

## Considerações

- Use o backend configurado no `.env` / `axios` se aplicável.
- O projeto já está ajustado para usar `styled-components` e temas dinâmicos.
- Verifique rotas e tokens no `AuthMiddleware`.

## Histórico de mudanças recentes (dois commits principais)

- `fix: sidebar mobile behavior and responsive layout`
- `fix: responsive home cards and transactions table search layout`
- `fix: responsive account page layout`
- `docs: update README with project overview and features`

---

Este README foi revisado e substituído integralmente para melhor refletir as funcionalidades atuais do projeto.
