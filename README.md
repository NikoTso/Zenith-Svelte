# Zenith-Svelte

Aplicação web de gerenciamento de tarefas acadêmicas no modelo **Kanban**, desenvolvida com foco na utilização de TypeScript e Svelte.

## Equipe

* Pedro Arthur Souza Napp
* Gabriel Oliveira Medeiros
* Lucas Cardoso Marinho
* Felipe Martins Sudré

## Tecnologias utilizadas

* **SvelteKit:** framework utilizado para estruturar e desenvolver a aplicação.
* **Svelte 5:** criação de componentes e atualização reativa da interface.
* **TypeScript:** tipagem dos dados e definição das estruturas de tarefas e projetos.
* **Vite:** servidor de desenvolvimento e ferramenta de build.
* **JSON Server:** API local para disponibilizar os dados de projetos e tarefas.

## Funcionalidades

* Visualização das tarefas em um quadro Kanban.
* Organização das tarefas por status: A fazer, Em andamento, Em revisão e Concluída.
* Busca de tarefas pelo título.
* Filtro por status e prioridade.
* Exibição de informações como descrição, responsável, prazo e prioridade.
* Carregamento das tarefas por meio de uma API local.

## Como executar o projeto

### Pré-requisitos

É necessário ter instalado:

* [Node.js](https://nodejs.org/)
* npm, instalado junto com o Node.js.

### 1. Clonar o repositório

```bash
git clone NikoTso/Zenith-Svelte
cd Zenith-Svelte
```

### 2. Instalar as dependências

Na pasta do projeto, execute:

```bash
npm install
```

### 3. Iniciar a API local

Abra um terminal na pasta do projeto e execute:

```bash
npx json-server db.json
```

A API ficará disponível em:

http://localhost:3000

### 4. Iniciar a aplicação

Abra um segundo terminal na pasta do projeto, mantendo a API em execução, e execute:

```bash
npm run dev
```

Acesse no navegador o endereço informado pelo Vite, normalmente:

http://localhost:5173

**Importante:** mantenha os dois terminais abertos enquanto utilizar a aplicação: um para a API e outro para o servidor de desenvolvimento.

## Objetivo acadêmico

Projeto desenvolvido para a disciplina de Desenvolvimento Frontend, com o objetivo de aplicar conceitos de desenvolvimento web utilizando Svelte e TypeScript.
