
<script lang="ts">
  import { onMount } from 'svelte'
  import TarefaCard from '#lib/components/TarefaCard.svelte'
  import Filtros from '#lib/components/Filtros.svelte'
  import { listarTarefas } from '../api'
  import { filtros, filtrarTarefas } from '#lib/estadoFiltros.svelte.ts'
  import type { Tarefa } from '../tipos'
  import AlternadorVisao from '#lib/components/AlternadorVisao.svelte'

  let tarefas: Tarefa[] = $state([])
  let carregando = $state(true)
  let erro = $state('')

  // Issue #26: utiliza o estado compartilhado da busca e dos filtros.
  let tarefasFiltradas = $derived(filtrarTarefas(tarefas))

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

  <AlternadorVisao ativa="lista" />

  <!-- Issues #24, #25 e #26: busca e filtros com estado compartilhado. -->
  <Filtros
    busca={filtros.busca}
    status={filtros.statusSelecionado}
    prioridade={filtros.prioridadeSelecionada}
    onBuscaChange={(valor) => (filtros.busca = valor)}
    onStatusChange={(valor) => (filtros.statusSelecionado = valor)}
    onPrioridadeChange={(valor) => (filtros.prioridadeSelecionada = valor)}
  />

  {#if carregando}
    <p>Carregando tarefas...</p>
  {:else if erro}
    <p role="alert">{erro}</p>
  {:else if tarefas.length === 0}
    <p>Nenhuma tarefa cadastrada.</p>
  {:else if tarefasFiltradas.length === 0}
    <p>Nenhuma tarefa corresponde à busca e aos filtros selecionados.</p>
  {:else}
    <section class="grid" aria-label="Lista de tarefas">
      {#each tarefasFiltradas as tarefa (tarefa.id)}
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
