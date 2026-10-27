import type {
  Tarefa,
  Projeto,
  NovaTarefa,
  NovoProjeto,
  AtualizarTarefa,
  AtualizarProjeto,
} from "./tipos";

const API = "http://localhost:3000";

export type ProjetoComTarefas = Projeto & {tarefas: Tarefa[];};

// Função genérica para consultas
async function get<T>(url: string): Promise<T> {
  const resposta = await fetch(`${API}/${url}`);

  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`);
  }

  return (await resposta.json()) as T;
}

// Função genérica para criação e atualização
async function escrever<T, D extends object>(
  url: string,
  metodo: "POST" | "PATCH",
  dados: D,
): Promise<T> {
  const resposta = await fetch(`${API}/${url}`, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`);
  }

  return (await resposta.json()) as T;
}

// Listar e buscar tarefas
export function listarTarefas(): Promise<Tarefa[]> {
  return get<Tarefa[]>("tarefas");
}

export function buscarTarefa(id: string): Promise<Tarefa> {
  return get<Tarefa>(`tarefas/${id}`);
}

// Listar e buscar projetos
export function listarProjetos(): Promise<Projeto[]> {
  return get<Projeto[]>("projetos");
}

export function buscarProjeto(id: string): Promise<ProjetoComTarefas> {
  return get<ProjetoComTarefas>(`projetos/${id}?_embed=tarefas`);
}

// Criar tarefa
export function criarTarefa(dados: NovaTarefa): Promise<Tarefa> {
  return escrever<Tarefa, NovaTarefa>("tarefas", "POST", dados);
}

// Atualizar tarefa
export function atualizarTarefa(
  id: string,
  dados: AtualizarTarefa,
): Promise<Tarefa> {
  return escrever<Tarefa, AtualizarTarefa>(`tarefas/${id}`, "PATCH", dados);
}

// Criar projeto
export function criarProjeto(dados: NovoProjeto): Promise<Projeto> {
  return escrever<Projeto, NovoProjeto>("projetos", "POST", dados);
}

// Atualizar projeto
export function atualizarProjeto(
  id: string,
  dados: AtualizarProjeto,
): Promise<Projeto> {
  return escrever<Projeto, AtualizarProjeto>(`projetos/${id}`, "PATCH", dados);
}
