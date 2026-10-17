<script lang="ts">
  import { onMount } from 'svelte'
  import {
    listarProjetos,
    criarTarefa,
    atualizarTarefa
  } from '../../api'

  import type {
    NovaTarefa,
    Projeto,
    Tarefa
  } from '../../tipos'

  type Props = {
    tarefa?: Tarefa
    onSaved?: (tarefa: Tarefa) => void
  }

  let { tarefa, onSaved }: Props = $props()

  let projetos: Projeto[] = $state([])
  let carregandoProjetos = $state(true)
  let enviando = $state(false)
  let erroProjetos = $state('')
  let erro = $state('')
  let sucesso = $state('')

  function formularioInicial(
    tarefa?: Tarefa
  ): NovaTarefa {
    return {
      projetoId: tarefa?.projetoId ?? '',
      titulo: tarefa?.titulo ?? '',
      descricao: tarefa?.descricao ?? '',
      status: tarefa?.status ?? 'a-fazer',
      prioridade: tarefa?.prioridade ?? 'media',
      responsavel: tarefa?.responsavel ?? '',
      prazo: tarefa?.prazo ?? ''
    }
  }

  // svelte-ignore state_referenced_locally
  let formulario: NovaTarefa = $state(
    formularioInicial(tarefa)
  )

  // Atualiza os campos caso a tarefa recebida mude.
  $effect(() => {
    formulario = formularioInicial(tarefa)
  })

  // Carrega as opções do seletor pela API.
  onMount(async () => {
    try {
      projetos = await listarProjetos()
    } catch (error) {
      console.error('Erro ao carregar projetos:', error)
      erroProjetos = 'Não foi possível carregar os projetos.'
    } finally {
      carregandoProjetos = false
    }
  })

  async function salvar(event: SubmitEvent) {
    event.preventDefault()

    erro = ''
    sucesso = ''
    enviando = true

    try {
      const resultado = tarefa
        ? await atualizarTarefa(tarefa.id, formulario)
        : await criarTarefa(formulario)

      sucesso = tarefa
        ? 'Tarefa atualizada com sucesso!'
        : 'Tarefa criada com sucesso!'

      onSaved?.(resultado)
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error)

      erro = 'Não foi possível salvar a tarefa.'
    } finally {
      enviando = false
    }
  }
</script>

<svelte:head>
  <title>{tarefa ? 'Editar tarefa' : 'Nova tarefa'} - Zenith</title>
</svelte:head>

<section class="formulario">
  <h1>{tarefa ? 'Editar tarefa' : 'Nova tarefa'}</h1>

  {#if erroProjetos}
    <p class="erro" role="alert">{erroProjetos}</p>
  {/if}

  <form onsubmit={salvar}>
    <label for="titulo">Título</label>
    <input
      id="titulo"
      name="titulo"
      bind:value={formulario.titulo}
      required
    />

    <label for="descricao">Descrição</label>
    <textarea
      id="descricao"
      name="descricao"
      bind:value={formulario.descricao}
      required
    ></textarea>

    <label for="projetoId">Projeto</label>
    <select
      id="projetoId"
      name="projetoId"
      bind:value={formulario.projetoId}
      disabled={carregandoProjetos || projetos.length === 0}
      required
    >
      <option value="" disabled>
        {carregandoProjetos
          ? 'Carregando projetos...'
          : 'Selecione um projeto'}
      </option>

      {#each projetos as projeto (projeto.id)}
        <option value={projeto.id}>
          {projeto.nome}
        </option>
      {/each}
    </select>

    <label for="status">Status</label>
    <select
      id="status"
      name="status"
      bind:value={formulario.status}
      required
    >
      <option value="a-fazer">A fazer</option>
      <option value="em-andamento">Em andamento</option>
      <option value="em-revisao">Em revisão</option>
      <option value="concluida">Concluída</option>
    </select>

    <label for="prioridade">Prioridade</label>
    <select
      id="prioridade"
      name="prioridade"
      bind:value={formulario.prioridade}
      required
    >
      <option value="baixa">Baixa</option>
      <option value="media">Média</option>
      <option value="alta">Alta</option>
    </select>

    <label for="responsavel">Responsável</label>
    <input
      id="responsavel"
      name="responsavel"
      bind:value={formulario.responsavel}
      required
    />

    <label for="prazo">Prazo</label>
    <input
      id="prazo"
      name="prazo"
      type="date"
      bind:value={formulario.prazo}
      required
    />

    {#if erro}
      <p class="erro" role="alert">{erro}</p>
    {/if}

    {#if sucesso}
      <p class="sucesso" role="status">{sucesso}</p>
    {/if}

    <button
      type="submit"
      disabled={
        enviando ||
        carregandoProjetos ||
        projetos.length === 0
      }
    >
      {enviando
        ? 'Salvando...'
        : tarefa
          ? 'Salvar alterações'
          : 'Criar tarefa'}
    </button>
  </form>
</section>

<style>
  .formulario {
    max-width: 620px;
    margin: 2rem auto;
    padding: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  label {
    margin-top: 0.5rem;
    font-weight: 600;
  }

  input,
  textarea,
  select,
  button {
    width: 100%;
    box-sizing: border-box;
    padding: 0.7rem;
    font: inherit;
    border: 1px solid #555;
    border-radius: 6px;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  button {
    margin-top: 1rem;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .erro {
    color: #dc4545;
  }

  .sucesso {
    color: #218838;
  }
</style>
