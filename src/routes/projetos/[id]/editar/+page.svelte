
<script lang="ts">
   import { goto } from '$app/navigation'
   import type { PageProps } from './$types'
   import FormProjeto from '../../../../lib/components/FormProjeto.svelte'
   import { atualizarProjeto } from '../../../../api'
   import type { Projeto } from '../../../../tipos'

   type CamposProjeto = Pick<
      Projeto,
      'nome' | 'descricao' | 'disciplina'
   >

   let { data }: PageProps = $props()

   let projeto = $derived(data.projeto)

   async function salvar(campos: CamposProjeto) {
      await atualizarProjeto(projeto.id, {
         ...campos,
         criadoEm: projeto.criadoEm
      })

      await goto(`/Zenith-Svelte/projetos/${projeto.id}`)
   }
</script>

<svelte:head>
   <title>Editar {projeto.nome} - Zenith</title>
</svelte:head>

<div class="pagina">
   <a href={`/Zenith-Svelte/projetos/${projeto.id}`}>
      ← Cancelar e voltar ao projeto
   </a>

   <h1>Editar projeto</h1>

   <FormProjeto
      inicial={{
         nome: projeto.nome,
         descricao: projeto.descricao,
         disciplina: projeto.disciplina
      }}
      aoSalvar={salvar}
      textoBotao="Salvar alterações"
   />
</div>

<style>
   .pagina {
      max-width: 720px;
      margin: 0 auto;
      padding: 1.5rem 1rem;
   }

   .pagina > a {
      display: inline-block;
      margin-bottom: 1rem;
   }
</style>
