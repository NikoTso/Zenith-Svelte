<script lang="ts">
  import { onMount } from 'svelte'
  import { listarProjetos } from '../../api'
  import type { Projeto } from '../../tipos'

  let projetos: Projeto[] = $state([])
  let erro = $state('')

  onMount(async () => {
    try {
      projetos = await listarProjetos()
    } catch {
      erro = 'Não foi possível carregar os projetos.'
    }
  })
</script>

<h1>Lista de projetos</h1>

{#if erro}
  <p>{erro}</p>
{:else if projetos.length === 0}
  <p>Nenhum projeto encontrado.</p>
{:else}
  {#each projetos as projeto (projeto.id)}
    <article>
      <h2>{projeto.nome}</h2>
      <p>{projeto.descricao}</p>
      <p>Disciplina: {projeto.disciplina}</p>

      <a href={`/projetos/${projeto.id}`}>
        Ver projeto
      </a>
    </article>
  {/each}
{/if}