import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { listarProjetos } from '../../../api'

export const load: PageLoad = async ({ url }) => {
  const projetoIdInicial =
    url.searchParams.get('projetoId') ?? ''

  // Permite abrir o formulário sem um projeto pré-selecionado.
  if (!projetoIdInicial) {
    return { projetoIdInicial: '' }
  }

  let projetos

  try {
    projetos = await listarProjetos()
  } catch {
    error(500, 'Não foi possível verificar os projetos.')
  }

  const projetoExiste = projetos.some(
    (projeto) => projeto.id === projetoIdInicial
  )

  if (!projetoExiste) {
    error(404, 'Projeto não existe.')
  }

  return { projetoIdInicial }
}