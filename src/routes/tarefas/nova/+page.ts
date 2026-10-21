import type { PageLoad } from './$types'
import { listarProjetos } from '../../../api'

export const load: PageLoad = async ({ url }) => {
  const projetos = await listarProjetos()

  const projetoIdInicial =
    url.searchParams.get('projetoId') ?? ''

  return {
    projetos,
    projetoIdInicial
  }
}