<script lang="ts">
	import { goto } from '$app/navigation';
	import FormProjeto from '#lib/components/FormProjeto.svelte';
	import { criarProjeto } from '../../../api';

	async function salvar(campos: { nome: string; descricao: string; disciplina: string }) {
		const novo = await criarProjeto({
			...campos,
			criadoEm: new Date().toISOString().slice(0, 10)
		});
		await goto(`/projetos/${novo.id}`);
	}
</script>

<svelte:head>
	<title>Novo projeto - Zenith</title>
</svelte:head>

<section class="pagina">
	<a href="/projetos" class="voltar">← Projetos</a>
	<h1>Novo projeto</h1>

	<FormProjeto
		inicial={{ nome: '', descricao: '', disciplina: '' }}
		aoSalvar={salvar}
		textoBotao="Criar projeto"
	/>
</section>

<style>
	.pagina {
		max-width: 720px;
		margin: 0 auto;
		padding: 1.5rem 1rem;
		color: #e2e8f0;
	}
	.voltar {
		display: inline-block;
		margin-bottom: 1rem;
		color: #38bdf8;
		text-decoration: none;
	}
	h1 {
		margin: 0 0 1.25rem;
	}
</style>
