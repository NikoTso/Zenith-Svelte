<script lang="ts">
  import { goto } from '$app/navigation'
  import type { PageProps } from './$types'
  import TarefaForm from '../../../../lib/components/TarefaForm.svelte'

  let { data }: PageProps = $props()

  async function aoSalvar() {
    await goto(`/tarefas/${data.tarefa.id}`)
  }
</script>

<svelte:head>
  <title>Editar tarefa - Zenith</title>
</svelte:head>

<main>
  <a
    class="botao-voltar"
    href={`/tarefas/${data.tarefa.id}`}
  >
    ← Cancelar e voltar aos detalhes
  </a>

  <TarefaForm
    tarefa={data.tarefa}
    onSaved={aoSalvar}
  />
</main>

<style>
  main {
    max-width: 720px;
    margin: 0 auto;
    padding: 1rem;
  }

  .botao-voltar {
    display: inline-block;
    margin: 1rem 0;
    color: #2457c5;
    text-decoration: none;
  }

  .botao-voltar:hover {
    text-decoration: underline;
  }

  .botao-voltar:focus-visible {
    outline: 3px solid #2457c5;
    outline-offset: 3px;
  }
</style>