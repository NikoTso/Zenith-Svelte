
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { buscarProjeto } from '../../../../api'

export const load: PageLoad = async ({ params }) => {
   try {
      const projeto = await buscarProjeto(params.id)

      return { projeto }
   } catch {
      error(404, 'Projeto não encontrado')
   }
}
