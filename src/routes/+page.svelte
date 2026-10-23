<script lang="ts">
  import { onMount } from 'svelte'
  import TarefaCard from '#lib/components/TarefaCard.svelte'
  import Filtros from '#lib/components/Filtros.svelte'
  import { listarTarefas } from '../api'
  import type { Prioridade, Status, Tarefa } from '../tipos'

  let tarefas: Tarefa[] = $state([])
  let carregando = $state(true)
  let erro = $state('')

  // Issues #24 e #25: estado dos controles de busca e filtros.
  // TODO — Issue #26: centralizar estes estados em um módulo/store compartilhado
  // para que a lista e a futura rota /quadro usem exatamente os mesmos valores.
  let busca = $state('')
  let statusSelecionado = $state<Status | ''>('')
  let prioridadeSelecionada = $state<Prioridade | ''>('')

  // Issue #24: busca pelo título, sem diferenciar maiúsculas de minúsculas.
  // Issue #25: os filtros de status e prioridade são combinados com a busca.
  let tarefasFiltradas = $derived(
    tarefas.filter((tarefa) => {
      const termo = busca.trim().toLocaleLowerCase()
      const titulo = tarefa.titulo.toLocaleLowerCase()

      const correspondeTitulo = titulo.includes(termo)
      const correspondeStatus =
        statusSelecionado === '' || tarefa.status === statusSelecionado
      const correspondePrioridade =
        prioridadeSelecionada === '' ||
        tarefa.prioridade === prioridadeSelecionada

      return (
        correspondeTitulo &&
        correspondeStatus &&
        correspondePrioridade
      )
    })
  )

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

  <!-- Issues #24 e #25: componente de busca e filtros já existente. -->
  <Filtros
    {busca}
    status={statusSelecionado}
    prioridade={prioridadeSelecionada}
    onBuscaChange={(valor) => (busca = valor)}
    onStatusChange={(valor) => (statusSelecionado = valor)}
    onPrioridadeChange={(valor) => (prioridadeSelecionada = valor)}
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

  <!-- TODO — Issue #28: adicionar navegação entre a lista e o quadro,
       preservando busca e filtros; usar o estado compartilhado da Issue #26. -->
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
