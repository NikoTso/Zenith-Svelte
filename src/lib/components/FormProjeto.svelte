
<script lang="ts">
   import { tick } from 'svelte'
   import type { NovoProjeto } from '../../tipos'

   type CamposProjeto = Pick<
      NovoProjeto,
      'nome' | 'descricao' | 'disciplina'
   >

   type Props = {
      inicial: CamposProjeto
      aoSalvar: (campos: CamposProjeto) => Promise<void>
      textoBotao?: string
   }

   let {
      inicial,
      aoSalvar,
      textoBotao = 'Salvar'
   }: Props = $props()

   // svelte-ignore state_referenced_locally
   let campos: CamposProjeto = $state({ ...inicial })

   let erros: Partial<Record<keyof CamposProjeto, string>> =
      $state({})

   let erro = $state('')
   let salvando = $state(false)

   async function enviar(evento: SubmitEvent) {
      evento.preventDefault()

      const formulario = evento.currentTarget as HTMLFormElement

      erros = {}
      erro = ''

      if (!campos.nome.trim()) {
         erros.nome = 'Informe o nome do projeto.'
      }

      if (!campos.disciplina.trim()) {
         erros.disciplina = 'Informe a disciplina.'
      }

      if (Object.keys(erros).length > 0) {
         await tick()

         formulario
         .querySelector<HTMLElement>('[aria-invalid="true"]')
         ?.focus()

         return
      }

      salvando = true

      try {
         await aoSalvar({
         nome: campos.nome.trim(),
         descricao: campos.descricao.trim(),
         disciplina: campos.disciplina.trim()
         })
      } catch (error) {
         console.error('Erro ao salvar projeto:', error)
         erro = 'Não foi possível salvar o projeto.'
      } finally {
         salvando = false
      }
   }
   </script>

   <form onsubmit={enviar} novalidate>
   <label for="nome">Nome do projeto *</label>
   <input
      id="nome"
      name="nome"
      type="text"
      bind:value={campos.nome}
      required
      aria-invalid={Boolean(erros.nome)}
      aria-describedby={erros.nome ? 'erro-nome' : undefined}
   />

   {#if erros.nome}
      <p id="erro-nome" class="erro" role="alert">
         {erros.nome}
      </p>
   {/if}

   <label for="disciplina">Disciplina *</label>
   <input
      id="disciplina"
      name="disciplina"
      type="text"
      bind:value={campos.disciplina}
      required
      aria-invalid={Boolean(erros.disciplina)}
      aria-describedby={
         erros.disciplina ? 'erro-disciplina' : undefined
      }
   />

   {#if erros.disciplina}
      <p id="erro-disciplina" class="erro" role="alert">
         {erros.disciplina}
      </p>
   {/if}

   <label for="descricao">Descrição</label>
   <textarea
      id="descricao"
      name="descricao"
      bind:value={campos.descricao}
      rows="4"
   ></textarea>

   {#if erro}
      <p class="erro" role="alert">{erro}</p>
   {/if}

   <button type="submit" disabled={salvando}>
      {salvando ? 'Salvando...' : textoBotao}
   </button>
</form>

<style>
   form {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      max-width: 620px;
   }

   label {
      margin-top: 0.5rem;
      font-weight: 600;
   }

   input,
   textarea,
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

   input[aria-invalid="true"] {
      border: 2px solid #b42318;
   }

   .erro {
      color: #b42318;
      font-weight: 600;
      margin: 0;
   }

   button {
      margin-top: 1rem;
      cursor: pointer;
   }

   button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
   }

   input:focus-visible,
   textarea:focus-visible,
   button:focus-visible {
      outline: 3px solid #2457c5;
      outline-offset: 2px;
   }
</style>
