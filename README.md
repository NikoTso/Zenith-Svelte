# Zenith-Svelte

Aplicação web de gerenciamento de tarefas acadêmicas, desenvolvida com **SvelteKit, Svelte 5 e TypeScript**, que permite organizar projetos e tarefas por meio de uma interface inspirada no modelo **Kanban**.

## Acesse a aplicação

**[Zenith-Svelte — Acessar o site](https://nikotso.github.io/Zenith-Svelte/)**

## Equipe

- Pedro Arthur Souza Napp
- Gabriel Oliveira Medeiros
- Lucas Cardoso Marinho
- Felipe Martins Sudré

## Tecnologias utilizadas

- **SvelteKit:** framework utilizado para estruturar e desenvolver a aplicação.
- **Svelte 5:** criação de componentes e gerenciamento reativo da interface.
- **TypeScript:** tipagem estática e organização dos dados da aplicação.
- **Vite:** ferramenta de desenvolvimento e geração do build.
- **Supabase:** serviço de banco de dados e backend utilizado para armazenar e gerenciar projetos e tarefas.
- **GitHub Pages:** hospedagem da aplicação web.
- **GitHub Actions:** automação do processo de build e publicação.

## Funcionalidades

- Cadastro, visualização, edição e exclusão de tarefas.
- Cadastro, visualização, edição e exclusão de projetos.
- Organização das tarefas em quadro Kanban.
- Separação das tarefas por status:
  - A fazer;
  - Em andamento;
  - Em revisão;
  - Concluída.
- Visualização das tarefas em formato de lista.
- Busca de tarefas.
- Filtros por status e prioridade.
- Exibição de informações como descrição, responsável, prazo e prioridade.
- Associação de tarefas aos respectivos projetos.
- Alteração do status das tarefas diretamente nos cartões.

## Como executar o projeto localmente

### Pré-requisitos

É necessário ter instalado:

- [Node.js](https://nodejs.org/) (versão 22 ou compatível com o projeto).
- npm, instalado junto com o Node.js.

### 1. Clonar o repositório

```bash
git clone https://github.com/NikoTso/Zenith-Svelte.git
cd Zenith-Svelte
```

### 2. Instalar as dependências

Na pasta do projeto, execute:

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e configure as credenciais do Supabase:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
```

Substitua os valores de exemplo pelas credenciais do projeto Supabase.

**Importante:** não compartilhe nem envie o arquivo `.env` para o GitHub. As credenciais necessárias para o deploy devem ser configuradas nos secrets do repositório.

### 4. Iniciar a aplicação

Execute:

```bash
npm run dev
```

Acesse no navegador o endereço informado pelo Vite, normalmente:

http://localhost:5173

### 5. Verificar o projeto

Para verificar possíveis erros de TypeScript e Svelte:

```bash
npm run check
```

Para gerar a versão de produção:

```bash
npm run build
```

## Publicação

A aplicação está hospedada no GitHub Pages:

**https://nikotso.github.io/Zenith-Svelte/**

O processo de publicação é automatizado pelo GitHub Actions. A cada atualização enviada para a branch principal (`main`), o workflow realiza a instalação das dependências, executa o build e publica os arquivos gerados.

## Objetivo acadêmico

Projeto desenvolvido para a disciplina de Desenvolvimento Frontend, com o objetivo de aplicar conhecimentos de desenvolvimento web, componentização, tipagem estática, reatividade e integração com banco de dados utilizando SvelteKit, Svelte 5, TypeScript e Supabase.
