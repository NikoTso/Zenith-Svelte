import type { NovaTarefa, Projeto, Tarefa } from './tipos'

const API = 'http://localhost:3000'

export type ProjetoComTarefas = Projeto & {
  tarefas: Tarefa[]
}

async function get<Tipo>(caminho: string): Promise<Tipo> {
  const resposta = await fetch(`${API}${caminho}`)

  if (!resposta.ok) {
    throw new Error(
      `Erro ao acessar ${caminho}: HTTP ${resposta.status}`
    )
  }

  return (await resposta.json()) as Tipo
}

export function listarTarefas(): Promise<Tarefa[]> {
  return get<Tarefa[]>('/tarefas')
}

export function buscarTarefa(id: string): Promise<Tarefa> {
  return get<Tarefa>(`/tarefas/${encodeURIComponent(id)}`)
}

export function listarProjetos(): Promise<Projeto[]> {
  return get<Projeto[]>('/projetos')
}

export function buscarProjeto(
  id: string
): Promise<ProjetoComTarefas> {
  return get<ProjetoComTarefas>(
    `/projetos/${encodeURIComponent(id)}?_embed=tarefas`
  )
}

export async function criarTarefa(
  dados: NovaTarefa
): Promise<Tarefa> {
  const resposta = await fetch(`${API}/tarefas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })

  if (!resposta.ok) {
    throw new Error(
      `Erro ao criar tarefa: HTTP ${resposta.status}`
    )
  }

  return (await resposta.json()) as Tarefa
}

export async function atualizarTarefa(
  id: string,
  dados: Partial<NovaTarefa>
): Promise<Tarefa> {
  const resposta = await fetch(
    `${API}/tarefas/${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    }
  )

  if (!resposta.ok) {
    throw new Error(
      `Erro ao atualizar tarefa: HTTP ${resposta.status}`
    )
  }

  return (await resposta.json()) as Tarefa
}