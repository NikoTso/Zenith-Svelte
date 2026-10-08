import type { Tarefa } from './tipos'

const API = 'http://localhost:3000'

export async function listarTarefas(): Promise<Tarefa[]> {
  const resposta = await fetch(`${API}/tarefas`)

  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`)
  }

  return resposta.json() as Promise<Tarefa[]>
}