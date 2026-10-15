
<script lang="ts">
  import { onMount } from 'svelte'
  import TarefaCard from '#lib/components/TarefaCard.svelte'
  import { listarTarefas } from '../api'
  import type { Tarefa } from '../tipos'

  let tarefas: Tarefa[] = $state([])
  let carregando = $state(true)
  let erro = $state('')

  onMount(async () => {
    try {
      tarefas = await listarTarefas()
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
      erro = 'Não foi possível carregar as tarefas.'
    } finally {
      carregando = false
    }
  })
</script>

<svelte:head>
  <title>Tarefas - Zenith</title>
</svelte:head>

<main>
  <h1>Tarefas</h1>

  {#if carregando}
    <p>Carregando tarefas...</p>
  {:else if erro}
    <p role="alert">{erro}</p>
  {:else if tarefas.length === 0}
    <p>Nenhuma tarefa cadastrada.</p>
  {:else}
    <section class="grid">
      {#each tarefas as tarefa (tarefa.id)}
        <a href={`/tarefas/${tarefa.id}`} class="card-link">
          <TarefaCard {tarefa} />
        </a>
      {/each}
    </section>
  {/if}
</main>

<style>
  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }

  .card-link {
    color: inherit;
    text-decoration: none;
  }
</style>
