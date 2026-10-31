
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { buscarTarefa, ErroApi } from '../../../../api'

export const load: PageLoad = async ({ params }) => {
  try {
    const tarefa = await buscarTarefa(params.id)

    return {
      tarefa
    }
  } catch (erro) {
    if (erro instanceof ErroApi && erro.status === 404) {
      error(404, 'Tarefa não encontrada')
    }

    error(500, 'Não foi possível carregar a tarefa para edição. Verifique se a API está funcionando.')
  }
}
