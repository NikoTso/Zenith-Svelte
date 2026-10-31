
<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/state'
  import { goto } from '$app/navigation'
  import { buscarTarefa, excluirTarefa } from '../../../api'
  import type { Tarefa } from '../../../tipos'
  import Carregando from '#lib/components/Carregando.svelte'

  let tarefa: Tarefa | null = $state(null)
  let carregando = $state(true)
  let erro = $state('')
  let excluindo = $state(false)
  let erroExclusao = $state('')

  async function confirmarExclusao() {
    if (!tarefa || excluindo) return

    const confirmou = window.confirm(
      `Deseja excluir a tarefa "${tarefa.titulo}"? Esta ação não pode ser desfeita.`
    )

    if (!confirmou) return

    excluindo = true
    erroExclusao = ''

    try {
      await excluirTarefa(tarefa.id)
      await goto('/')
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error)
      erroExclusao = 'Não foi possível excluir a tarefa.'
    } finally {
      excluindo = false
    }
  }

  async function carregarTarefa() {
    carregando = true
    erro = ''

    try {
      const id = page.params.id

      if (!id) {
        erro = 'ID da tarefa não informado.'
        return
      }

      tarefa = await buscarTarefa(id)
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error)
      erro = 'Não foi possível carregar a tarefa. Verifique se a API está funcionando e tente novamente.'
    } finally {
      carregando = false
    }
  }

  onMount(carregarTarefa)
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
    <Carregando mensagem="Carregando tarefa..." />
  {:else if erro}
    <p role="alert">{erro}</p>
    <button type="button" onclick={carregarTarefa}>Tentar novamente</button>
  {:else if tarefa}
    <h2>{tarefa.titulo}</h2>
    <p>{tarefa.descricao}</p>

    <div class="acoes">
      <a
        class="botao-editar"
        href={`/tarefas/${tarefa.id}/editar`}
      >
        Editar tarefa
      </a>

      <button
        type="button"
        class="botao-excluir"
        onclick={confirmarExclusao}
        disabled={excluindo}
      >
        {excluindo ? 'Excluindo...' : 'Excluir tarefa'}
      </button>
    </div>

    {#if erroExclusao}
      <p role="alert">{erroExclusao}</p>
    {/if}

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
  .acoes {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin: 1rem 0;
  }

  .botao-editar {
    display: inline-block;
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

  .botao-excluir {
    padding: 0.7rem 1rem;
    border: 1px solid #b42318;
    border-radius: 6px;
    background-color: #b42318;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .botao-excluir:hover:not(:disabled) {
    background-color: #8e1b13;
  }

  .botao-excluir:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  .botao-editar:focus-visible,
  .botao-excluir:focus-visible {
    outline: 3px solid #e8b94a;
    outline-offset: 3px;
  }
</style>
