import type { Tarefa, Projeto } from './tipos'

const API = 'http://localhost:3000'

export type ProjetoComTarefas = Projeto & {
  tarefas: Tarefa[]
}

async function get<T>(url: string): Promise<T> {
  const resposta = await fetch(`${API}/${url}`)

  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`)
  }
  return (await resposta.json()) as T
}

export function listarTarefas(): Promise<Tarefa[]> {
  return get<Tarefa[]>('tarefas')
}

export function buscarTarefa(id: string): Promise<Tarefa> {
  return get<Tarefa>(`tarefas/${id}`)
}

export function listarProjetos(): Promise<Projeto[]> {
  return get<Projeto[]>('projetos')
}

export function buscarProjeto(id: string): Promise<ProjetoComTarefas> {
  return get<ProjetoComTarefas>(`projetos/${id}?_embed=tarefas`)
}