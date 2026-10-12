
<script lang="ts">
  let { params } = $props()

  const tarefa = {
    titulo: 'Criar página inicial',
    descricao: 'Desenvolver a interface do projeto.',
    status: 'Em andamento',
    prioridade: 'Alta',
    responsavel: 'Pedro',
    prazo: '20/10/2026',
    projeto: 'Gerenciador de Tarefas',
    criadaEm: '10/10/2026'
  }
</script>

<svelte:head>
  <title>Detalhe da tarefa #{params.id}</title>
</svelte:head>

<main>
  <a href="/">← Voltar</a>

  <h1>Detalhe da tarefa</h1>
  <p>ID da tarefa: {params.id}</p>

  <section>
    <h2>{tarefa.titulo}</h2>
    <p>{tarefa.descricao}</p>

    <dl>
      <dt>Status</dt>
      <dd>{tarefa.status}</dd>

      <dt>Prioridade</dt>
      <dd>{tarefa.prioridade}</dd>

      <dt>Responsável</dt>
      <dd>{tarefa.responsavel}</dd>

      <dt>Prazo</dt>
      <dd>{tarefa.prazo}</dd>

      <dt>Projeto</dt>
      <dd>{tarefa.projeto}</dd>

      <dt>Data de criação</dt>
      <dd>{tarefa.criadaEm}</dd>
    </dl>
  </section>
</main>
