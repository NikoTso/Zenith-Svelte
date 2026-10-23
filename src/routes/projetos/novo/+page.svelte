
<script lang="ts">
   import { goto } from '$app/navigation'
   import FormProjeto from '../../../lib/components/FormProjeto.svelte'
   import { criarProjeto } from '../../../api'
   import type { Projeto } from '../../../tipos'

   type CamposProjeto = Pick<
      Projeto,
      'nome' | 'descricao' | 'disciplina'
   >

   async function salvar(campos: CamposProjeto) {
      const novo = await criarProjeto({
         ...campos,
         criadoEm: new Date().toISOString().slice(0, 10)
      })

      await goto(`/projetos/${novo.id}`)
   }
</script>

<svelte:head>
  <title>Novo projeto - Zenith</title>
</svelte:head>

<main>
   <a href="/projetos">← Voltar aos projetos</a>

   <h1>Novo projeto</h1>

   <FormProjeto
      inicial={{
         nome: '',
         descricao: '',
         disciplina: ''
      }}
      aoSalvar={salvar}
      textoBotao="Criar projeto"
   />
</main>

<style>
   main {
      max-width: 720px;
      margin: 0 auto;
      padding: 1.5rem 1rem;
   }

   main > a {
      display: inline-block;
      margin-bottom: 1rem;
   }
</style>
