import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import {
  buscarTarefa,
  listarProjetos
} from '../../../../api'

export const load: PageLoad = async ({ params }) => {
  try {
    const [tarefa, projetos] = await Promise.all([
      buscarTarefa(params.id),
      listarProjetos()
    ])

    return {
      tarefa,
      projetos
    }
  } catch {
    error(404, 'Tarefa não encontrada')
  }
}