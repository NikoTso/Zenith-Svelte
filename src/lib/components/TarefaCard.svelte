
<script lang="ts">
  import type { Tarefa } from '../../tipos'

  let { tarefa }: { tarefa: Tarefa } = $props()
</script>

<article class="tarefa-card">
  <div class="tarefa-topo">
    <span class="status">{tarefa.status}</span>

    <span class="prioridade prioridade-{tarefa.prioridade}">
      {tarefa.prioridade}
    </span>
  </div>

  <h3>{tarefa.titulo}</h3>

  <p class="descricao">{tarefa.descricao}</p>

  <dl>
    <div class="informacao">
      <dt>Responsável</dt>
      <dd>{tarefa.responsavel}</dd>
    </div>

    <div class="informacao">
      <dt>Prazo</dt>
      <dd>{tarefa.prazo}</dd>
    </div>
  </dl>
</article>

<style>
  .tarefa-card {
    min-width: 0;
    padding: 1rem;
    border: 1px solid #37456e;
    border-radius: 0.65rem;
    background: #101936;
    color: #f1f5f9;
  }

  .tarefa-topo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .status {
    min-width: 0;
    color: #a9bdfb;
    font-size: 0.85rem;
    overflow-wrap: anywhere;
  }

  .prioridade {
    flex-shrink: 0;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: lowercase;
  }

  .prioridade-baixa {
    color: #6ee7b7;
  }

  .prioridade-media {
    color: #fbbf24;
  }

  .prioridade-alta {
    color: #fb7185;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.05rem;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  .descricao {
    margin: 0;
    color: #b8c5e3;
    font-size: 0.95rem;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }

  dl {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: 1rem;
    row-gap: 0.75rem;
    margin: 1.25rem 0 0;
    padding-top: 1rem;
    border-top: 1px solid #293555;
  }

  .informacao {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
    min-width: 0;
  }

  dt {
    margin: 0;
    color: #a9bdfb;
    font-size: 0.85rem;
    line-height: 1.4;
    white-space: normal;
    overflow-wrap: normal;
  }

  dd {
    min-width: 0;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
    word-break: normal;
  }

  @media (max-width: 1200px) {
    dl {
      grid-template-columns: minmax(0, 1fr);
      gap: 0.75rem;
    }
  }

  @media (max-width: 400px) {
    .tarefa-card {
      padding: 0.75rem;
    }

    dl {
      gap: 0.5rem;
    }

    dt,
    dd {
      font-size: 0.8rem;
    }
  }
</style>
