<script lang="ts">
  import { onMount } from 'svelte'
  import type { Projeto } from '../../tipos'

  let projetos: Projeto[] = $state([])

  onMount(async () => {
    const resposta = await fetch('http://localhost:3000/projetos')
    projetos = await resposta.json()
  })
</script>

<h1>Lista de projetos</h1>

{#each projetos as projeto (projeto.id)}
  <article>
    <h2>{projeto.nome}</h2>
    <p>{projeto.descricao}</p>
    <p>Disciplina: {projeto.disciplina}</p>
    <a href={`/projetos/${projeto.id}`}>Ver projeto</a>
  </article>
{/each}

<a href="/">Voltar para tarefas</a>