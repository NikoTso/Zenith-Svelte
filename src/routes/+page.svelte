
<script lang="ts">
  import { onMount } from 'svelte'
  import TarefaCard from '#lib/components/TarefaCard.svelte'
  import Filtros from '#lib/components/Filtros.svelte'
  import { listarTarefas } from '../api'
  import { filtros, filtrarTarefas } from '#lib/estadoFiltros.svelte.ts'
  import type { Tarefa } from '../tipos'
  import AlternadorVisao from '#lib/components/AlternadorVisao.svelte'
  import Carregando from '#lib/components/Carregando.svelte'

  let tarefas: Tarefa[] = $state([])
  let carregando = $state(true)
  let erro = $state('')

  // Issue #26: utiliza o estado compartilhado da busca e dos filtros.
  let tarefasFiltradas = $derived(filtrarTarefas(tarefas))

  function substituirTarefa(atualizada: Tarefa) {
    tarefas = tarefas.map((tarefa) =>
      tarefa.id === atualizada.id ? atualizada : tarefa
    )
  }

  async function carregarTarefas() {
    carregando = true
    erro = ''

    try {
      tarefas = await listarTarefas()
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
      erro = 'Não foi possível carregar as tarefas. Verifique se a API está funcionando e tente novamente.'
    } finally {
      carregando = false
    }
  }

  onMount(carregarTarefas)
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
    <Carregando mensagem="carregando tarefas..." />
  {:else if erro}
    <p role="alert">{erro}</p>
    <button type="button" onclick={carregarTarefas}>Tentar novamente</button>
  {:else if tarefas.length === 0}
    <p>Nenhuma tarefa cadastrada.</p>
  {:else if tarefasFiltradas.length === 0}
    <p>Nenhuma tarefa corresponde à busca e aos filtros selecionados.</p>
  {:else}
    <section class="grid" aria-label="Lista de tarefas">
      {#each tarefasFiltradas as tarefa (tarefa.id)}
        <TarefaCard
          {tarefa}
          href={`/tarefas/${tarefa.id}`}
          onStatusAlterado={substituirTarefa}
        />
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
</style>
