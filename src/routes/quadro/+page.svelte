
<script lang="ts">
  import { onMount } from 'svelte'
  import TarefaCard from '#lib/components/TarefaCard.svelte'
  import Filtros from '#lib/components/Filtros.svelte'
  import { listarTarefas } from '../../api'
  import { filtros, filtrarTarefas } from '../../lib/estadoFiltros.svelte.ts'
  import type { Status, Tarefa } from '../../tipos'
  import AlternadorVisao from '#lib/components/AlternadorVisao.svelte'

  let tarefas: Tarefa[] = $state([])
  let carregando = $state(true)
  let erro = $state('')

  const colunas: { status: Status; titulo: string }[] = [
    { status: 'a-fazer', titulo: 'A fazer' },
    { status: 'em-andamento', titulo: 'Em andamento' },
    { status: 'em-revisao', titulo: 'Em revisão' },
    { status: 'concluida', titulo: 'Concluída' }
  ]

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
  <title>Quadro de tarefas - Zenith</title>
</svelte:head>

<main>
  <h1>Quadro de tarefas</h1>

  <AlternadorVisao ativa="quadro" />

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
  {:else}
    <section class="quadro" aria-label="Quadro de tarefas">
      {#each colunas as coluna (coluna.status)}
        <div class="coluna">
          <h2>{coluna.titulo}</h2>

          {#each tarefasFiltradas.filter((tarefa) => tarefa.status === coluna.status) as tarefa (tarefa.id)}
            <a href={`/tarefas/${tarefa.id}`} class="card-link">
              <TarefaCard {tarefa} />
            </a>
          {:else}
            <p class="vazio">Nenhuma tarefa nesta coluna.</p>
          {/each}
        </div>
      {/each}
    </section>
  {/if}
</main>

<style>
   
.quadro {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: stretch;
  gap: 1rem;
  width: 100%;
}

.coluna {
  min-width: 0;
  padding: 0.75rem;
  border: 1px solid #37456e;
  border-radius: 0.75rem;
  background: #0b122b;
  box-sizing: border-box;
}

.card-link {
  display: block;
  min-width: 0;
  margin-bottom: 1rem;
  color: inherit;
  text-decoration: none;
}

.quadro .coluna :global(.tarefa-card dl) {
  grid-template-columns: minmax(0, 1fr);
  gap: 0.75rem;
}

.quadro .coluna :global(.tarefa-card .informacao) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
}

@media (max-width: 900px) {
  .quadro {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 500px) {
  .quadro {
    grid-template-columns: minmax(0, 1fr);
  }
}



</style>
