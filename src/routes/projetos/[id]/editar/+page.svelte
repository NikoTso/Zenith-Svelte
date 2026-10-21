<script lang="ts">
	import { goto } from '$app/navigation';
	import FormProjeto from '#lib/components/FormProjeto.svelte';
	import { atualizarProjeto } from '../../../../api';

	let { data } = $props();
	let projeto = $derived(data.projeto);

	async function salvar(campos: { nome: string; descricao: string; disciplina: string }) {
		await atualizarProjeto(projeto.id, {
			...campos,
			criadoEm: projeto.criadoEm
		});
		await goto(`/projetos/${projeto.id}`);
	}
</script>

<svelte:head>
	<title>Editar {projeto.nome} - Zenith</title>
</svelte:head>

<section class="pagina">
	<a href={`/projetos/${projeto.id}`} class="voltar">← Voltar ao projeto</a>
	<h1>Editar projeto</h1>

	<FormProjeto
		inicial={{ nome: projeto.nome, descricao: projeto.descricao, disciplina: projeto.disciplina }}
		aoSalvar={salvar}
		textoBotao="Salvar alterações"
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
