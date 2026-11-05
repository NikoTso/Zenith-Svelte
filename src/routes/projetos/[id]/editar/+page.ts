
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { buscarProjeto, ErroApi } from '../../../../api'

export const load: PageLoad = async ({ params }) => {
  try {
    const projeto = await buscarProjeto(params.id)

    return { projeto }
  } catch (erro) {
    if (erro instanceof ErroApi && erro.status === 404) {
      error(404, 'Projeto não encontrado')
    }

    error(500, 'Não foi possível carregar o projeto para edição. Verifique se a API está funcionando.')
  }
}
