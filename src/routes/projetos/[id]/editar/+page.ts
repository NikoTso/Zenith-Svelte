import { error } from '@sveltejs/kit';
import { buscarProjeto } from '../../../../api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const projeto = await buscarProjeto(params.id);
		return { projeto };
	} catch {
		error(404, 'Projeto não encontrado');
	}
};
