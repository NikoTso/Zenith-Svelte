<script lang="ts">
  import { onMount } from 'svelte'
  import { listarTarefas } from '../api'
  import type { Prioridade, Status, Tarefa } from '../tipos'
  import Filtros from '../lib/components/Filtros.svelte'
  import Kanban from '../lib/components/Kanban.svelte'

  let tarefas = $state<Tarefa[]>([])
  let busca = $state('')
  let status = $state<Status | ''>('')
  let prioridade = $state<Prioridade | ''>('')
  let carregando = $state(true)
  let erro = $state('')

  let tarefasVisiveis = $derived(
    tarefas.filter((tarefa) => {
      const correspondeBusca =
        tarefa.titulo
          .toLowerCase()
          .includes(busca.toLowerCase())

      const correspondeStatus =
        status === '' || tarefa.status === status

      const correspondePrioridade =
        prioridade === '' || tarefa.prioridade === prioridade

      return (
        correspondeBusca &&
        correspondeStatus &&
        correspondePrioridade
      )
    })
  )

  async function carregar() {
    carregando = true
    erro = ''

    try {
      tarefas = await listarTarefas()
    } catch (error) {
      erro =
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar as tarefas.'
    } finally {
      carregando = false
    }
  }

  onMount(carregar)
</script>

<svelte:head>
  <title>Gerenciador de Tarefas Acadêmicas</title>
  <meta
    name="description"
    content="Gerenciador de tarefas acadêmicas em Svelte"
  />
</svelte:head>

<main>
  <header class="cabecalho">
    <p class="eyebrow">GERENCIADOR ACADÊMICO</p>

    <h1>Gerenciador de Tarefas Acadêmicas</h1>

    <p>
      Organize seus projetos e acompanhe suas tarefas.
    </p>
  </header>

  <Filtros
    {busca}
    {status}
    {prioridade}
    onBuscaChange={(valor) => (busca = valor)}
    onStatusChange={(valor) => (status = valor)}
    onPrioridadeChange={(valor) => (prioridade = valor)}
  />

  <div
    class="status"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    {#if carregando}
      Carregando tarefas...
    {:else if erro}
      Erro ao carregar tarefas: {erro}
      <button onclick={carregar}>
        Tentar novamente
      </button>
    {:else if tarefas.length === 0}
      Não existem tarefas cadastradas.
    {:else if tarefasVisiveis.length === 0}
      Nenhuma tarefa corresponde aos filtros.
    {:else}
      {tarefasVisiveis.length}
      {tarefasVisiveis.length === 1 ? 'tarefa encontrada' : 'tarefas encontradas'}.
    {/if}
  </div>

  {#if !carregando && !erro}
    <Kanban tarefas={tarefasVisiveis} />
  {/if}
</main>

<footer>
  <p>
    Desenvolvimento Frontend — Gerenciador de Tarefas Acadêmicas
  </p>
</footer>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    font-family:
      Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    background: #f8fafc;
    color: #111827;
  }

  main {
    width: min(100% - 2rem, 120rem);
    margin: 0 auto;
    padding: 2rem 0;
  }

  .cabecalho {
    margin-bottom: 2rem;
  }

  .eyebrow {
    margin: 0 0 0.5rem;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  h1 {
    margin: 0 0 0.75rem;
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.1;
  }

  .cabecalho > p:last-child {
    margin: 0;
    color: #4b5563;
    font-size: 1.05rem;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-height: 2.5rem;
    margin-bottom: 1rem;
    color: #374151;
  }

  .status button {
    min-height: 2.5rem;
    padding: 0.5rem 0.75rem;
    border: 0;
    border-radius: 0.5rem;
    background: #111827;
    color: white;
    cursor: pointer;
    font: inherit;
  }

  .status button:hover {
    opacity: 0.9;
  }

  :global(:focus-visible) {
    outline: 3px solid #2563eb;
    outline-offset: 2px;
  }

  footer {
    padding: 1.5rem;
    border-top: 1px solid #d1d5db;
    text-align: center;
    color: #6b7280;
  }
</style>
