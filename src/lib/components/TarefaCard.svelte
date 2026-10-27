<script lang="ts">
  import type { Status, Tarefa } from '../../tipos'
  import { atualizarTarefa } from '../../api'
  import { opcoesStatus, rotuloStatus } from '../status'

  let {
    tarefa,
    href,
    onStatusAlterado
  }: {
    tarefa: Tarefa
    href?: string
    onStatusAlterado?: (tarefa: Tarefa) => void
  } = $props()

  let salvando = $state(false)
  let erroStatus = $state('')

  async function mudarStatus(evento: Event & { currentTarget: HTMLSelectElement }) {
    const seletor = evento.currentTarget
    const novoStatus = seletor.value as Status

    if (novoStatus === tarefa.status) return

    salvando = true
    erroStatus = ''

    try {
      const atualizada = await atualizarTarefa(tarefa.id, { status: novoStatus })
      onStatusAlterado?.(atualizada)
    } catch (error) {
      console.error('Erro ao mudar status da tarefa:', error)
      erroStatus = 'Não foi possível mudar o status.'
      seletor.value = tarefa.status
    } finally {
      salvando = false
    }
  }
</script>

<article class="tarefa-card">
  <div class="tarefa-topo">
    {#if onStatusAlterado}
      <div class="campo-status">
        <label class="sr-only" for="status-{tarefa.id}">
          Status da tarefa {tarefa.titulo}
        </label>

        <select
          id="status-{tarefa.id}"
          class="seletor-status"
          value={tarefa.status}
          disabled={salvando}
          aria-busy={salvando}
          onchange={mudarStatus}
        >
          {#each opcoesStatus as opcao (opcao.valor)}
            <option value={opcao.valor}>{opcao.rotulo}</option>
          {/each}
        </select>
      </div>
    {:else}
      <span class="status">{rotuloStatus(tarefa.status)}</span>
    {/if}

    <span class="prioridade prioridade-{tarefa.prioridade}">
      {tarefa.prioridade}
    </span>
  </div>

  {#if erroStatus}
    <p class="erro-status" role="alert">{erroStatus}</p>
  {/if}

  <h3>
    {#if href}
      <a {href} class="link-detalhe">{tarefa.titulo}</a>
    {:else}
      {tarefa.titulo}
    {/if}
  </h3>

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
    position: relative;
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

  .campo-status {
    position: relative;
    z-index: 1;
    min-width: 0;
  }

  .seletor-status {
    max-width: 100%;
    padding: 0.25rem 0.4rem;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .erro-status {
    margin: 0 0 0.5rem;
    color: #fb7185;
    font-size: 0.85rem;
  }

  .link-detalhe {
    color: inherit;
    text-decoration: none;
  }

  .link-detalhe::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 0.65rem;
  }

  .link-detalhe:focus-visible {
    outline: none;
  }

  .tarefa-card:has(.link-detalhe:hover),
  .tarefa-card:has(.link-detalhe:focus-visible) {
    border-color: var(--gold, #e8b94a);
  }

  .tarefa-card:has(.link-detalhe:focus-visible) {
    outline: 3px solid var(--gold, #e8b94a);
    outline-offset: 2px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
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
