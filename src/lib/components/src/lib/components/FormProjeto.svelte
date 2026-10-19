<script lang="ts">
	// Formulário usado na criação e na edição de projetos (issue #22).
	// Visual escuro, no mesmo padrão dos demais componentes do projeto.
	import type { NovoProjeto } from '../../api';

	type Campos = Pick<NovoProjeto, 'nome' | 'descricao' | 'disciplina'>;

	let {
		inicial,
		aoSalvar,
		textoBotao = 'Salvar'
	}: {
		inicial: Campos;
		aoSalvar: (campos: Campos) => Promise<void>;
		textoBotao?: string;
	} = $props();

	let campos = $state<Campos>({ ...inicial });
	let erro = $state('');
	let salvando = $state(false);

	function validar(): string {
		if (!campos.nome.trim()) return 'Informe o nome do projeto.';
		if (!campos.disciplina.trim()) return 'Informe a disciplina.';
		return '';
	}

	async function enviar(evento: SubmitEvent) {
		evento.preventDefault();
		erro = validar();
		if (erro) return;

		salvando = true;
		try {
			await aoSalvar({
				nome: campos.nome.trim(),
				descricao: campos.descricao.trim(),
				disciplina: campos.disciplina.trim()
			});
		} catch {
			erro = 'Não foi possível salvar o projeto. Tente novamente.';
		} finally {
			salvando = false;
		}
	}
</script>

<form class="formulario" onsubmit={enviar} novalidate>
	<label>
		<span>Nome do projeto</span>
		<input type="text" bind:value={campos.nome} placeholder="Ex.: Site da turma" />
	</label>

	<label>
		<span>Disciplina</span>
		<input type="text" bind:value={campos.disciplina} placeholder="Ex.: Front-end" />
	</label>

	<label>
		<span>Descrição</span>
		<textarea rows="4" bind:value={campos.descricao} placeholder="Do que se trata o projeto?"></textarea>
	</label>

	{#if erro}
		<p class="erro" role="alert">{erro}</p>
	{/if}

	<button type="submit" disabled={salvando}>
		{salvando ? 'Salvando…' : textoBotao}
	</button>
</form>

<style>
	.formulario {
		display: grid;
		gap: 1.25rem;
		max-width: 640px;
		padding: 1.75rem;
		border-radius: 16px;
		background: #0f172a;
		border: 1px solid #1e293b;
		box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.6);
		color: #e2e8f0;
	}
	label {
		display: grid;
		gap: 0.4rem;
	}
	label span {
		font-size: 0.85rem;
		font-weight: 600;
		color: #94a3b8;
		letter-spacing: 0.02em;
	}
	input,
	textarea {
		font: inherit;
		color: #f1f5f9;
		background: #020617;
		border: 1px solid #1e293b;
		border-radius: 10px;
		padding: 0.7rem 0.9rem;
		transition: border-color 0.15s, box-shadow 0.15s;
	}
	input::placeholder,
	textarea::placeholder {
		color: #475569;
	}
	input:focus,
	textarea:focus {
		outline: none;
		border-color: #38bdf8;
		box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
	}
	textarea {
		resize: vertical;
	}
	.erro {
		margin: 0;
		color: #fca5a5;
		font-size: 0.9rem;
	}
	button {
		justify-self: start;
		font: inherit;
		font-weight: 600;
		color: #0f172a;
		background: #38bdf8;
		border: 0;
		border-radius: 10px;
		padding: 0.7rem 1.4rem;
		cursor: pointer;
	}
	button:hover:not(:disabled) {
		background: #7dd3fc;
	}
	button:disabled {
		opacity: 0.6;
		cursor: wait;
	}
</style>
