import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { buscarTarefa } from '../../../../api'

export const load: PageLoad = async ({ params }) => {
  try {
    const tarefa = await buscarTarefa(params.id)

    return {
      tarefa
    }
  } catch {
    error(404, 'Tarefa não encontrada')
  }
}