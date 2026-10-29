
<script lang="ts">
  import { onMount } from 'svelte'
  import { listarProjetos } from '../../api'
  import Carregando from '#lib/components/Carregando.svelte'
  import type { Projeto } from '../../tipos'

  let projetos: Projeto[] = $state([])
  let carregando = $state(true)
  let erro = $state('')

  onMount(async () => {
    try {
      projetos = await listarProjetos()
    } catch (error) {
      console.error('Erro ao carregar projetos:', error)
      erro = 'Não foi possível carregar os projetos.'
    } finally {
      carregando = false
    }
  })
</script>

<h1>Lista de projetos</h1>
<a href="/projetos/novo">+ Novo projeto</a>

{#if carregando}
  <Carregando mensagem="Carregando projetos..." />
{:else if erro}
  <p role="alert">{erro}</p>
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
