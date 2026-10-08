<script lang="ts">
  import type { Tarefa } from '../../tipos'

  let { tarefa }: { tarefa: Tarefa } = $props()
</script>

<article class="tarefa-card">
  <div class="tarefa-topo">
    <span class="prioridade prioridade-{tarefa.prioridade}">
      {tarefa.prioridade}
    </span>
  </div>

  <h3>{tarefa.titulo}</h3>

  <p>{tarefa.descricao}</p>

  <dl>
    <div>
      <dt>Responsável</dt>
      <dd>{tarefa.responsavel}</dd>
    </div>

    <div>
      <dt>Prazo</dt>
      <dd>{tarefa.prazo}</dd>
    </div>
  </dl>
</article>

<style>
  .tarefa-card {
    padding: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.75rem;
    background: white;
    box-shadow: 0 2px 5px rgb(0 0 0 / 8%);
  }

  .tarefa-topo {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5rem;
  }

  .prioridade {
    padding: 0.25rem 0.5rem;
    border-radius: 0.4rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .prioridade-baixa {
    background: #dcfce7;
  }

  .prioridade-media {
    background: #fef3c7;
  }

  .prioridade-alta {
    background: #fee2e2;
  }

  h3 {
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0 0 1rem;
    color: #4b5563;
  }

  dl {
    margin: 0;
  }

  dl div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 0.35rem;
  }

  dt {
    font-weight: 600;
  }

  dd {
    margin: 0;
  }
</style>