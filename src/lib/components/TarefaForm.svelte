
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
  projetoIdInicial?: string
  onSaved?: (tarefa: Tarefa) => void
  }

  let {
    tarefa,
    projetoIdInicial = '',
    onSaved
  }: Props = $props()

  let projetos: Projeto[] = $state([])
  let carregandoProjetos = $state(true)
  let enviando = $state(false)
  let erroProjetos = $state('')
  let erro = $state('')
  let sucesso = $state('')

  // NOVO: erros individuais de cada campo
  let erros: Partial<Record<keyof NovaTarefa, string>> = $state({})

  function formularioInicial(
    tarefa?: Tarefa,
    projetoIdInicial = ''
  ): NovaTarefa {
    return {
      projetoId: tarefa?.projetoId ?? projetoIdInicial,
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
    formularioInicial(tarefa, projetoIdInicial)
  )

  $effect(() => {
    formulario = formularioInicial(tarefa, projetoIdInicial)
  })

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

  // NOVO: validação dos campos obrigatórios
  function validarFormulario(): boolean {
    erros = {}

    if (!formulario.titulo.trim()) {
      erros.titulo = 'Informe o título da tarefa.'
    }

    if (!formulario.descricao.trim()) {
      erros.descricao = 'Informe a descrição da tarefa.'
    }

    const projetoExiste = projetos.some(
      (projeto) => projeto.id === formulario.projetoId
    )

    if (!formulario.projetoId) {
      erros.projetoId = 'Selecione um projeto.'
    } else if (!projetoExiste) {
      erros.projetoId = 'O projeto selecionado não existe.'
    }

    if (!formulario.responsavel.trim()) {
      erros.responsavel = 'Informe o responsável.'
    }

    if (!formulario.prazo) {
      erros.prazo = 'Informe o prazo.'
    }

    return Object.keys(erros).length === 0
  }

  async function salvar(event: SubmitEvent) {
    event.preventDefault()

    erro = ''
    sucesso = ''

    // NOVO: não envia se houver campos inválidos
    if (!validarFormulario()) {
      return
    }

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

  <!-- novalidate permite apresentar nossas próprias mensagens -->
  <form onsubmit={salvar} novalidate>
    <label for="titulo">Título *</label>
    <input
      id="titulo"
      name="titulo"
      bind:value={formulario.titulo}
      required
      aria-invalid={Boolean(erros.titulo)}
      aria-describedby={erros.titulo ? 'erro-titulo' : undefined}
    />
    {#if erros.titulo}
      <p id="erro-titulo" class="erro" role="alert">
        {erros.titulo}
      </p>
    {/if}

    <label for="descricao">Descrição *</label>
    <textarea
      id="descricao"
      name="descricao"
      bind:value={formulario.descricao}
      required
      aria-invalid={Boolean(erros.descricao)}
      aria-describedby={erros.descricao ? 'erro-descricao' : undefined}
    ></textarea>
    {#if erros.descricao}
      <p id="erro-descricao" class="erro" role="alert">
        {erros.descricao}
      </p>
    {/if}

    <label for="projetoId">Projeto *</label>
    <select
      id="projetoId"
      name="projetoId"
      bind:value={formulario.projetoId}
      disabled={carregandoProjetos || projetos.length === 0}
      required
      aria-invalid={Boolean(erros.projetoId)}
      aria-describedby={erros.projetoId ? 'erro-projeto' : undefined}
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
    {#if erros.projetoId}
      <p id="erro-projeto" class="erro" role="alert">
        {erros.projetoId}
      </p>
    {/if}

    <label for="status">Status *</label>
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

    <label for="prioridade">Prioridade *</label>
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

    <label for="responsavel">Responsável *</label>
    <input
      id="responsavel"
      name="responsavel"
      bind:value={formulario.responsavel}
      required
      aria-invalid={Boolean(erros.responsavel)}
      aria-describedby={erros.responsavel ? 'erro-responsavel' : undefined}
    />
    {#if erros.responsavel}
      <p id="erro-responsavel" class="erro" role="alert">
        {erros.responsavel}
      </p>
    {/if}

    <label for="prazo">Prazo *</label>
    <input
      id="prazo"
      name="prazo"
      type="date"
      bind:value={formulario.prazo}
      required
      aria-invalid={Boolean(erros.prazo)}
      aria-describedby={erros.prazo ? 'erro-prazo' : undefined}
    />
    {#if erros.prazo}
      <p id="erro-prazo" class="erro" role="alert">
        {erros.prazo}
      </p>
    {/if}

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

  /* NOVO: campo inválido identificável visualmente */
  input[aria-invalid="true"],
  textarea[aria-invalid="true"],
  select[aria-invalid="true"] {
    border: 2px solid #b42318;
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
    color: #b42318;
    font-weight: 600;
    margin: 0;
  }

  .sucesso {
    color: #218838;
  }

  /* NOVO: indicação de foco para navegação por teclado */
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible,
  button:focus-visible {
    outline: 3px solid #2457c5;
    outline-offset: 2px;
  }
</style>
