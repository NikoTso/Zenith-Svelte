
<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/state'
  import { goto } from '$app/navigation'
  import { buscarTarefa, excluirTarefa, ErroApi } from '../../../api'
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
      await goto('/Zenith-Svelte/')
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error)
      erroExclusao = 'Não foi possível excluir a tarefa. Verifique se a API está funcionando e tente novamente.'
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

      if (error instanceof ErroApi && error.status === 404) {
        erro = 'Tarefa não encontrada.'
      } else {
        erro = 'Não foi possível carregar a tarefa. Verifique se a API está funcionando e tente novamente.'
      }

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

<div class="pagina">
  <a href="/Zenith-Svelte/projetos">← Voltar aos projetos</a>
  <h1>Detalhe da tarefa</h1>

  {#if carregando}
    <Carregando mensagem="Carregando tarefa..." />

  {:else if erro}
    <p role="alert">{erro}</p>

    {#if erro !== 'Tarefa não encontrada.'}
      <button type="button" onclick={carregarTarefa}>
        Tentar novamente
      </button>
    {/if}

  {:else if tarefa}
    <h2>{tarefa.titulo}</h2>
    <p>{tarefa.descricao}</p>

    <div class="acoes">
      <a
        class="botao-editar"
        href={`/Zenith-Svelte/tarefas/${tarefa.id}/editar`}
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
</div>

<style>
  .pagina {
    max-width: 900px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
    color: #f1f5f9;
  }

  .pagina > a {
    display: inline-block;
    margin-bottom: 1.5rem;
    color: #a9bdfb;
    font-weight: 600;
    text-decoration: none;
  }

  .pagina > a:hover {
    color: #e8b94a;
  }

  .pagina h1 {
    margin: 0 0 1.5rem;
    font-size: 1.8rem;
  }

  .pagina h2 {
    margin: 0 0 0.75rem;
    color: #f1f5f9;
    font-size: 1.4rem;
    overflow-wrap: anywhere;
  }

  .pagina > p {
    color: #b8c5e3;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }

  .acoes {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin: 1.5rem 0;
  }

  .botao-editar,
  .botao-excluir {
    display: inline-block;
    padding: 0.75rem 1.1rem;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    font: inherit;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }

  .botao-editar {
    border-color: #e8b94a;
    background: #e8b94a;
    color: #14102a;
  }

  .botao-editar:hover {
    background: #f5cf6b;
  }

  .botao-excluir {
    border-color: #b42318;
    background: #b42318;
    color: white;
  }

  .botao-excluir:hover:not(:disabled) {
    background: #8e1b13;
  }

  .botao-excluir:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  .botao-editar:focus-visible,
  .botao-excluir:focus-visible,
  .pagina > a:focus-visible {
    outline: 3px solid #f5cf6b;
    outline-offset: 3px;
  }

  dl {
    display: grid;
    grid-template-columns: minmax(120px, 0.7fr) minmax(0, 2fr);
    gap: 0;
    margin: 1.5rem 0;
    padding: 0.5rem 1rem;
    border: 1px solid #37456e;
    border-radius: 0.75rem;
    background: #101936;
  }

  dt,
  dd {
    min-width: 0;
    margin: 0;
    padding: 0.85rem 0;
    border-bottom: 1px solid #293555;
    overflow-wrap: anywhere;
    text-align: center;
  }

  dt {
    color: #a9bdfb;
    font-weight: 600;
  }

  dd {
    color: #f1f5f9;
  }

  dt:last-of-type,
  dd:last-of-type {
    border-bottom: none;
  }

  [role="alert"] {
    padding: 0.85rem 1rem;
    border: 1px solid #b42318;
    border-radius: 0.5rem;
    background: #351b2a;
    color: #fda4af;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    .pagina {
      padding: 1rem 0.75rem;
    }

    .pagina h1 {
      font-size: 1.5rem;
    }

    dl {
      grid-template-columns: minmax(0, 1fr);
      padding: 0.5rem 0.85rem;
    }

    dt {
      padding-bottom: 0.2rem;
      border-bottom: none;
    }

    dd {
      padding-top: 0.2rem;
    }
  }
</style>
