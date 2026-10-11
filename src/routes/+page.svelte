<script lang="ts">
  import { onMount } from 'svelte'
  import type { Tarefa } from '../tipos'

  let tarefas: Tarefa[] = $state([])

  onMount(async () => {
    const resposta = await fetch('http://localhost:3000/tarefas')
    tarefas = await resposta.json()
  })
</script>

<h1>Lista de tarefas</h1>

{#each tarefas as tarefa (tarefa.id)}
  <article>
    <h2>{tarefa.titulo}</h2>
    <p>{tarefa.descricao}</p>
    <p>Status: {tarefa.status}</p>
    <p>Responsável: {tarefa.responsavel}</p>
  </article>
{/each}

<a href="/projetos">Ver projetos</a>