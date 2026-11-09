import type {
  Tarefa,
  Projeto,
  NovaTarefa,
  NovoProjeto,
  AtualizarTarefa,
  AtualizarProjeto,
} from "./tipos";
import { supabase } from "./lib/supabase";

const API = import.meta.env.VITE_API_URL;

export type ProjetoComTarefas = Projeto & { tarefas: Tarefa[] };

// Erro específico para identificar falhas retornadas pela API.
export class ErroApi extends Error {
  constructor(public status: number,
    message: string = `HTTP ${status}`,
  ) {
    super(`HTTP ${status}`);
    this.name = "ErroApi";
  }
}

// Função genérica para consultas
async function get<T>(url: string): Promise<T> {
  const resposta = await fetch(`${API}/${url}`);

  if (!resposta.ok) {

    throw new ErroApi(resposta.status);
  }

  return (await resposta.json()) as T;
}

function verificarErro(error: {message: string;status?: number;} | null): void {
  if (error) {
    throw new ErroApi(error.status ?? 500, error.message);
  }
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
    throw new ErroApi(resposta.status);
  }

  return (await resposta.json()) as T;
}

// Listar e buscar tarefas
export async  function listarTarefas(): Promise<Tarefa[]> {
  const { data, error } = await supabase
  .from("tarefas")
  .select("*");

  verificarErro(error);

  return (data ?? []) as Tarefa[];
}

export async function buscarTarefa(id: string): Promise<Tarefa> {
  const { data, error } = await supabase
  .from("tarefas")
  .select("*")
  .eq("id", id)
  .single();

  verificarErro(error);

  return data as Tarefa;
}

// Listar e buscar projetos
export async function listarProjetos(): Promise<Projeto[]> {
  const { data, error } = await supabase
  .from("projetos")
  .select("*");

  verificarErro(error);

  return (data ?? []) as Projeto[];
}

export async function buscarProjeto(id: string): Promise<ProjetoComTarefas> {
  const { data, error } = await supabase
  .from("projetos")
  .select("*, tarefas(*)")
  .eq("id", id)
  .single();

  verificarErro(error);

  return data as ProjetoComTarefas;
}

// Criar tarefa
export async function criarTarefa(dados: NovaTarefa): Promise<Tarefa> {
  const { data, error } = await supabase
  .from("tarefas")
  .insert(dados)
  .select()
  .single();

  verificarErro(error);

  return data as Tarefa;
}

// Atualizar tarefa
export async function atualizarTarefa(
  id: string,
  dados: AtualizarTarefa,
): Promise<Tarefa> {
  const { data, error } = await supabase
  .from("tarefas")
  .update(dados)
  .eq("id", id)
  .select()
  .single();

  verificarErro(error);

  return data as Tarefa;
}

// Criar projeto
export async function criarProjeto(dados: NovoProjeto): Promise<Projeto> {
  const { data, error } = await supabase
  .from("projetos")
  .insert(dados)
  .select()
  .single();

  verificarErro(error);

  return data as Projeto;
}

// Atualizar projeto
export async function atualizarProjeto(
  id: string,
  dados: AtualizarProjeto,
): Promise<Projeto> {
  const { data, error } = await supabase
  .from("projetos")
  .update(dados)
  .eq("id", id)
  .select()
  .single();

  verificarErro(error);

  return data as Projeto;
}

// Excluir tarefa
export async function excluirTarefa(id: string): Promise<void> {
  const { error } = await supabase
    .from("tarefas")
    .delete()
    .eq("id", id);

  verificarErro(error);
}
