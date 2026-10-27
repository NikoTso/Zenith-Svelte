
<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/state'
  import { buscarTarefa } from '../../../api'
  import type { Tarefa } from '../../../tipos'

  let tarefa: Tarefa | null = $state(null)
  let carregando = $state(true)
  let erro = $state('')

  onMount(async () => {
    try {
      const id = page.params.id

      if (!id) {
        erro = 'ID da tarefa não informado.'
        return
      }

      tarefa = await buscarTarefa(id)
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error)
      erro = 'Não foi possível carregar a tarefa.'
    } finally {
      carregando = false
    }
  })
</script>

<svelte:head>
  <title>
    {tarefa ? `${tarefa.titulo} - Zenith` : 'Detalhe da tarefa - Zenith'}
  </title>
</svelte:head>

<main>
  <a href="/projetos">← Voltar aos projetos</a>
  <h1>Detalhe da tarefa</h1>

  {#if carregando}
    <p>Carregando tarefa...</p>
  {:else if erro}
    <p role="alert">{erro}</p>
  {:else if tarefa}
    <h2>{tarefa.titulo}</h2>
    <p>{tarefa.descricao}</p>
    <a class="botao-editar" href={`/tarefas/${tarefa.id}/editar`}>
      Editar tarefa
    </a>

    <dl>
      <dt>ID</dt>
      <dd>{tarefa.id}</dd>

      <dt>Projeto ID</dt>
      <dd>{tarefa.projetoId}</dd>

      <dt>Status</dt>
      <dd>{tarefa.status}</dd>

      <dt>Prioridade</dt>
      <dd>{tarefa.prioridade}</dd>

      <dt>Responsável</dt>
      <dd>{tarefa.responsavel}</dd>

      <dt>Prazo</dt>
      <dd>{tarefa.prazo}</dd>
    </dl>
  {/if}
</main>

<style>
  .botao-editar {
    display: inline-block;
    margin: 1rem 0;
    padding: 0.7rem 1rem;
    border-radius: 6px;
    background-color: #2457c5;
    color: white;
    text-decoration: none;
    font-weight: 600;
  }

  .botao-editar:hover {
    background-color: #1b449c;
  }

  .botao-editar:focus-visible {
    outline: 3px solid #2457c5;
    outline-offset: 3px;
  }
</style>
