import type {
  NovaTarefa,
  NovoProjeto,
  Tarefa,
  Projeto
} from './tipos'

const API = 'http://localhost:3000'

export type ProjetoComTarefas = Projeto & {
  tarefas: Tarefa[]
}

// Consultas de leitura
async function get<T>(url: string): Promise<T> {
  const resposta = await fetch(`${API}/${url}`)

  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`)
  }

  return (await resposta.json()) as T
}

// Criação e atualização
async function escrever<T, D extends object>(
  url: string,
  metodo: 'POST' | 'PATCH',
  dados: D
): Promise<T> {
  const resposta = await fetch(`${API}/${url}`, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })

  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`)
  }

  return (await resposta.json()) as T
}

// Listagem e busca de tarefas
export function listarTarefas(): Promise<Tarefa[]> {
  return get<Tarefa[]>('tarefas')
}

export function buscarTarefa(id: string): Promise<Tarefa> {
  return get<Tarefa>(`tarefas/${id}`)
}

// Listagem e busca de projetos
export function listarProjetos(): Promise<Projeto[]> {
  return get<Projeto[]>('projetos')
}

export function buscarProjeto(
  id: string
): Promise<ProjetoComTarefas> {
  return get<ProjetoComTarefas>(
    `projetos/${id}?_embed=tarefas`
  )
}

// Criar tarefa
export function criarTarefa(
  dados: NovaTarefa
): Promise<Tarefa> {
  return escrever<Tarefa, NovaTarefa>(
    'tarefas',
    'POST',
    dados
  )
}

// Atualizar tarefa
export function atualizarTarefa(
  id: string,
  dados: Partial<NovaTarefa>
): Promise<Tarefa> {
  return escrever<Tarefa, Partial<NovaTarefa>>(
    `tarefas/${id}`,
    'PATCH',
    dados
  )
}

// Criar projeto
export function criarProjeto(
  dados: NovoProjeto
): Promise<Projeto> {
  return escrever<Projeto, NovoProjeto>(
    'projetos',
    'POST',
    dados
  )
}

// Atualizar projeto
export function atualizarProjeto(
  id: string,
  dados: Partial<NovoProjeto>
): Promise<Projeto> {
  return escrever<Projeto, Partial<NovoProjeto>>(
    `projetos/${id}`,
    'PATCH',
    dados
  )
}