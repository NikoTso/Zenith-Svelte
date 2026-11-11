<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg'
	import type { LayoutProps } from './$types'
	import { navigating, page } from '$app/state'
	import Carregando from '#lib/components/Carregando.svelte';

	let { children }: LayoutProps = $props()

	function atual(caminho: string) {
		const rota = page.url.pathname.replace('/Zenith-Svelte', '') || '/'
		const ativo = caminho === '/' ? rota === '/' || rota.startsWith('/tarefas') : rota.startsWith(caminho)
		return ativo ? 'page' : undefined
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Zenith</title>
</svelte:head>

<a href="#conteudo" class="pular-conteudo">Pular para o conteúdo</a>

<header>
	<nav aria-label="Menu principal">
		<a href="/Zenith-Svelte/" class="logo">Zenith</a>

		<div class="menu">
			<a href="/Zenith-Svelte/" aria-current={atual('/')}>Tarefas</a>
			<a href="/Zenith-Svelte/quadro" aria-current={atual('/quadro')}>Quadro</a>
			<a href="/Zenith-Svelte/projetos" aria-current={atual('/projetos')}>Projetos</a>
		</div>
	</nav>
</header>

<main id="conteudo" tabindex="-1">
	{#if navigating.to}
		<Carregando mensagem="Carregando página..." />
	{/if}
	
	{@render children()}
</main>

<style>
	header {
		border-bottom: 1px solid #ddd;
		padding: 1rem 2rem;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		justify-content: space-between;
		max-width: 1200px;
		margin: 0 auto;
	}

	.logo {
		font-size: 1.4rem;
		font-weight: bold;
		text-decoration: none;
		color: inherit;
	}

	.menu {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
	}

	.menu a {
		text-decoration: none;
		color: inherit;
	}

	.menu a:hover {
		text-decoration: underline;
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	main:focus {
		outline: none;
	}

	.pular-conteudo {
		position: absolute;
		left: 1rem;
		top: -3rem;
		z-index: 100;
		padding: 0.5rem 1rem;
		background: #e8b94a;
		color: #14102a;
		font-weight: 700;
		border-radius: 6px;
		text-decoration: none;
	}

	.pular-conteudo:focus {
		top: 0.5rem;
	}

	@media (max-width: 40rem) {
		main {
			padding: 1rem;
		}
	}
</style>
