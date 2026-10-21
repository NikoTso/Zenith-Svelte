<script lang="ts">
  import { goto } from '$app/navigation'
  import type { PageProps } from './$types'
  import type {
    NovaTarefa,
    Prioridade,
    Status
  } from '../../../tipos'
  import { criarTarefa } from '../../../api'

  let { data }: PageProps = $props()

  let salvando = $state(false)
  let erro = $state('')

  async function salvar(event: SubmitEvent) {
    event.preventDefault()

    const formulario = event.currentTarget as HTMLFormElement
    const dados = new FormData(formulario)

    const tarefa: NovaTarefa = {
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

      await criarTarefa(tarefa)

      await goto('/')
    } catch {
      erro = 'Não foi possível criar a tarefa.'
    } finally {
      salvando = false
    }
  }
</script>

<svelte:head>
  <title>Nova tarefa - Zenith</title>
</svelte:head>

<h1>Nova tarefa</h1>

<form onsubmit={salvar}>
  <label>
    Projeto

    <select name="projetoId" required>
      <option value="" disabled selected={!data.projetoIdInicial}>
        Selecione um projeto
      </option>

      {#each data.projetos as projeto}
        <option
          value={projeto.id}
          selected={projeto.id === data.projetoIdInicial}
        >
          {projeto.nome}
        </option>
      {/each}
    </select>
  </label>

  <label>
    Título
    <input name="titulo" type="text" required />
  </label>

  <label>
    Descrição
    <textarea name="descricao" required></textarea>
  </label>

  <label>
    Status

    <select name="status" required>
      <option value="a-fazer">A fazer</option>
      <option value="em-andamento">Em andamento</option>
      <option value="em-revisao">Em revisão</option>
      <option value="concluida">Concluída</option>
    </select>
  </label>

  <label>
    Prioridade

    <select name="prioridade" required>
      <option value="baixa">Baixa</option>
      <option value="media">Média</option>
      <option value="alta">Alta</option>
    </select>
  </label>

  <label>
    Responsável
    <input name="responsavel" type="text" required />
  </label>

  <label>
    Prazo
    <input name="prazo" type="date" required />
  </label>

  {#if erro}
    <p>{erro}</p>
  {/if}

  <button type="submit" disabled={salvando}>
    {salvando ? 'Salvando...' : 'Criar tarefa'}
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