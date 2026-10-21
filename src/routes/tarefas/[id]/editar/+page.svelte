<script lang="ts">
  import { goto } from '$app/navigation'
  import type { PageProps } from './$types'
  import type {
    NovaTarefa,
    Prioridade,
    Status
  } from '../../../../tipos'
  import { atualizarTarefa } from '../../../../api'

  let { data }: PageProps = $props()

  let tarefa = $derived(data.tarefa)

  let salvando = $state(false)
  let erro = $state('')

  async function salvar(event: SubmitEvent) {
    event.preventDefault()

    const formulario = event.currentTarget as HTMLFormElement
    const dados = new FormData(formulario)

    const alteracoes: NovaTarefa = {
      projetoId: String(dados.get('projetoId')),
      titulo: String(dados.get('titulo')),
      descricao: String(dados.get('descricao')),
      status: String(dados.get('status')) as Status,
      prioridade: String(dados.get('prioridade')) as Prioridade,
      responsavel: String(dados.get('responsavel')),
      prazo: String(dados.get('prazo'))
    }

    try {
      salvando = true
      erro = ''

      await atualizarTarefa(tarefa.id, alteracoes)

      await goto(`/tarefas/${tarefa.id}`)
    } catch {
      erro = 'Não foi possível salvar as alterações.'
    } finally {
      salvando = false
    }
  }
</script>

<svelte:head>
  <title>Editar tarefa - Zenith</title>
</svelte:head>

<h1>Editar tarefa</h1>

<form onsubmit={salvar}>
  <label>
    Projeto

    <select name="projetoId" required>
      {#each data.projetos as projeto}
        <option
          value={projeto.id}
          selected={projeto.id === tarefa.projetoId}
        >
          {projeto.nome}
        </option>
      {/each}
    </select>
  </label>

  <label>
    Título
    <input
      name="titulo"
      type="text"
      value={tarefa.titulo}
      required
    />
  </label>

  <label>
    Descrição

    <textarea
      name="descricao"
      required
    >{tarefa.descricao}</textarea>
  </label>

  <label>
    Status

    <select name="status" required>
      <option
        value="a-fazer"
        selected={tarefa.status === 'a-fazer'}
      >
        A fazer
      </option>

      <option
        value="em-andamento"
        selected={tarefa.status === 'em-andamento'}
      >
        Em andamento
      </option>

      <option
        value="em-revisao"
        selected={tarefa.status === 'em-revisao'}
      >
        Em revisão
      </option>

      <option
        value="concluida"
        selected={tarefa.status === 'concluida'}
      >
        Concluída
      </option>
    </select>
  </label>

  <label>
    Prioridade

    <select name="prioridade" required>
      <option
        value="baixa"
        selected={tarefa.prioridade === 'baixa'}
      >
        Baixa
      </option>

      <option
        value="media"
        selected={tarefa.prioridade === 'media'}
      >
        Média
      </option>

      <option
        value="alta"
        selected={tarefa.prioridade === 'alta'}
      >
        Alta
      </option>
    </select>
  </label>

  <label>
    Responsável

    <input
      name="responsavel"
      type="text"
      value={tarefa.responsavel}
      required
    />
  </label>

  <label>
    Prazo

    <input
      name="prazo"
      type="date"
      value={tarefa.prazo}
      required
    />
  </label>

  {#if erro}
    <p>{erro}</p>
  {/if}

  <button type="submit" disabled={salvando}>
    {salvando ? 'Salvando...' : 'Salvar alterações'}
  </button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  input,
  textarea,
  select {
    padding: 0.7rem;
    font: inherit;
  }

  textarea {
    min-height: 100px;
  }

  button {
    padding: 0.8rem;
    cursor: pointer;
  }
</style>