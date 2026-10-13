<script lang="ts">
    import type { PageProps } from './$types'

    let { data }: PageProps = $props()

    let projeto = $derived(data.projeto)
</script>

<svelte:head>
    <title>{projeto.nome} - Zenith</title>
</svelte:head>

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

<h2>Tarefas do projeto</h2>

{#if projeto.tarefas.length === 0}
    <p>Este projeto não possui tarefas.</p>
{:else}
    <ul>
        {#each projeto.tarefas as tarefa}
            <li>
                <a href={`/tarefas/${tarefa.id}`}>{tarefa.titulo}</a>

                - {tarefa.status}
            </li>
        {/each}
    </ul>
{/if}