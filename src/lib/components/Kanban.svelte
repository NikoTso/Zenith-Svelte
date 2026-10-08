<script lang="ts">
  import type { Status, Tarefa } from '../../tipos'
  import TarefaCard from './TarefaCard.svelte'

  let { tarefas }: { tarefas: Tarefa[] } = $props()

  const colunas: { status: Status; titulo: string }[] = [
    {
      status: 'a-fazer',
      titulo: 'A fazer'
    },
    {
      status: 'em-andamento',
      titulo: 'Em andamento'
    },
    {
      status: 'em-revisao',
      titulo: 'Em revisão'
    },
    {
      status: 'concluida',
      titulo: 'Concluída'
    }
  ]

  function tarefasPorStatus(status: Status) {
    return tarefas.filter((tarefa) => tarefa.status === status)
  }
</script>

<section class="quadro" aria-label="Quadro de tarefas">
  {#each colunas as coluna}
    <section
      class="coluna"
      aria-labelledby="titulo-{coluna.status}"
    >
      <header>
        <h2 id="titulo-{coluna.status}">
          {coluna.titulo}
        </h2>

        <span>
          {tarefasPorStatus(coluna.status).length}
        </span>
      </header>

      <ul>
        {#each tarefasPorStatus(coluna.status) as tarefa}
          <li>
            <TarefaCard {tarefa} />
          </li>
        {:else}
          <li class="vazio">
            Nenhuma tarefa nesta coluna.
          </li>
        {/each}
      </ul>
    </section>
  {/each}
</section>

<style>
  .quadro {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .coluna {
    min-width: 0;
    padding: 1rem;
    border-radius: 0.75rem;
    background: #f3f4f6;
  }

  .coluna header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .coluna h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  .coluna header span {
    min-width: 1.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
    background: #e5e7eb;
    text-align: center;
    font-weight: 700;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .vazio {
    padding: 1rem;
    text-align: center;
    color: #6b7280;
  }

  @media (min-width: 60rem) {
    .quadro {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
</style>