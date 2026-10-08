<script lang="ts">
  import type { Prioridade, Status } from '../../tipos'

  let {
    busca = '',
    status = '',
    prioridade = '',
    onBuscaChange,
    onStatusChange,
    onPrioridadeChange
  }: {
    busca?: string
    status?: Status | ''
    prioridade?: Prioridade | ''
    onBuscaChange?: (valor: string) => void
    onStatusChange?: (valor: Status | '') => void
    onPrioridadeChange?: (valor: Prioridade | '') => void
  } = $props()
</script>

<section class="filtros" aria-labelledby="titulo-filtros">
  <h2 id="titulo-filtros">Busca e filtros</h2>

  <div class="campo">
    <label for="busca">Buscar tarefa</label>

    <input
      id="busca"
      type="search"
      value={busca}
      oninput={(evento) =>
        onBuscaChange?.(evento.currentTarget.value)}
    />
  </div>

  <div class="campo">
    <label for="status">Status</label>

    <select
      id="status"
      value={status}
      onchange={(evento) =>
        onStatusChange?.(
          evento.currentTarget.value as Status | ''
        )}
    >
      <option value="">Todos</option>
      <option value="a-fazer">A fazer</option>
      <option value="em-andamento">Em andamento</option>
      <option value="em-revisao">Em revisão</option>
      <option value="concluida">Concluída</option>
    </select>
  </div>

  <div class="campo">
    <label for="prioridade">Prioridade</label>

    <select
      id="prioridade"
      value={prioridade}
      onchange={(evento) =>
        onPrioridadeChange?.(
          evento.currentTarget.value as Prioridade | ''
        )}
    >
      <option value="">Todas</option>
      <option value="baixa">Baixa</option>
      <option value="media">Média</option>
      <option value="alta">Alta</option>
    </select>
  </div>
</section>

<style>
  .filtros {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.75rem;
    background: white;
  }

  .filtros h2 {
    margin: 0;
  }

  .campo {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  label {
    font-weight: 600;
  }

  input,
  select {
    min-height: 2.75rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid #9ca3af;
    border-radius: 0.5rem;
    font: inherit;
  }

  @media (min-width: 48rem) {
    .filtros {
      grid-template-columns: 2fr 1fr 1fr;
      align-items: end;
    }

    .filtros h2 {
      grid-column: 1 / -1;
    }
  }
</style>