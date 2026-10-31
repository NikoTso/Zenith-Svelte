<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg'
	import type { LayoutProps } from './$types'
	import { navigating } from '$app/state'
	import Carregando from '#lib/components/Carregando.svelte';

	let { children }: LayoutProps = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Zenith</title>
</svelte:head>

<header>
	<nav>
		<a href="/" class="logo">Zenith</a>

		<div class="menu">
			<a href="/">Tarefas</a>
			<a href="/quadro">Quadro</a>
			<a href="/projetos">Projetos</a>
		</div>
	</nav>
</header>

<main>
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
</style>