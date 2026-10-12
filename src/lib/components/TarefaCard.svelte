
<script lang="ts">
  type Tarefa = {
    titulo: string
    descricao: string
    status: string
    prioridade: string
    responsavel: string
    prazo: string
  }

  let { tarefa }: { tarefa: Tarefa } = $props()
</script>

<article class="tarefa-card">
  <div class="tarefa-topo">
    <span>{tarefa.status}</span>

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