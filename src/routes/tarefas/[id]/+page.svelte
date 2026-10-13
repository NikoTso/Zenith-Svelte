<script lang="ts">
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()

  let tarefa = $derived(data.tarefa)
</script>

<svelte:head>
  <title>{tarefa.titulo} - Zenith</title>
</svelte:head>

<a href="/">← Voltar para Tarefas</a>

<h1>{tarefa.titulo}</h1>

<p>{tarefa.descricao}</p>

<p>
  <strong>Status:</strong>
  {tarefa.status}
</p>

<p>
  <strong>Prioridade:</strong>
  {tarefa.prioridade}
</p>

<p>
  <strong>Responsável:</strong>
  {tarefa.responsavel}
</p>

<p>
  <strong>Prazo:</strong>
  {tarefa.prazo}
</p>

<p>
  <strong>Projeto:</strong>
  <a href={`/projetos/${tarefa.projetoId}`}>
    Ver projeto
  </a>
</p>