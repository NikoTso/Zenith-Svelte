<script lang="ts">
  import { goto } from '$app/navigation'
  import type { PageProps } from './$types'
  import TarefaForm from '../../../lib/components/TarefaForm.svelte'

  let { data }: PageProps = $props()

  async function aoSalvar() {
    await goto('/')
  }
</script>

<svelte:head>
  <title>Nova tarefa - Zenith</title>
</svelte:head>

<TarefaForm
  projetoIdInicial={data.projetoIdInicial}
  onSaved={aoSalvar}
/>