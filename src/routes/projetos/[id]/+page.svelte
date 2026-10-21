<script lang="ts">
	// Issue #42 - 14 - Criar a página do projeto
	// Versão baseada na implementação do branch Niko_dev, com o cartão da issue #29 (TarefaCard).

	import TarefaCard from '#lib/components/TarefaCard.svelte'

	let { data } = $props()
	let projeto = $derived(data.projeto)
</script>

<svelte:head>
	<title>{projeto.nome} - Zenith</title>
</svelte:head>

<section class="projeto">
	<a href="/projetos" class="voltar">← Projetos</a>

	<header>
		<h1>{projeto.nome}</h1>

		<p>{projeto.descricao}</p>

		<p>
			<strong>Disciplina:</strong>
			{projeto.disciplina}
		</p>

		<p>
			<strong>Criado em:</strong>
			{projeto.criadoEm}
		</p>
	</header>

	<a
		href={`/tarefas/nova?projetoId=${projeto.id}`}
		class="nova-tarefa"
	>
		+ Nova tarefa
	</a>

	<h2>Tarefas do projeto</h2>

	{#if projeto.tarefas.length === 0}
		<p class="vazio">Este projeto não possui tarefas.</p>
	{:else}
		<div class="grid">
			{#each projeto.tarefas as tarefa (tarefa.id)}
				<a
					href={`/tarefas/${tarefa.id}`}
					class="card-link"
				>
					<TarefaCard {tarefa} />
				</a>
			{/each}
		</div>
	{/if}
</section>

<style>
	.projeto {
		max-width: 1100px;
		margin: 0 auto;
		padding: 1.5rem 1rem;
	}

	.voltar {
		display: inline-block;
		margin-bottom: 1rem;
	}

	header {
		margin-bottom: 1rem;
	}

	.nova-tarefa {
		display: inline-block;
		margin: 0.5rem 0 1.5rem;
		padding: 0.7rem 1rem;
		text-decoration: none;
		border: 1px solid #ccc;
		border-radius: 6px;
		color: inherit;
	}

	.nova-tarefa:hover {
		background: #f5f5f5;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1rem;
	}

	.card-link {
		text-decoration: none;
		color: inherit;
	}

	.vazio {
		opacity: 0.7;
	}
</style>