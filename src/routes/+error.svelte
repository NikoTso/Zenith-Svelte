<script lang="ts">
    import { page } from '$app/state'
</script>

<svelte:head>
    <title>{page.status} - Zenith</title>
</svelte:head>

<h1>{page.status}</h1>

{#if page.status === 404}
    <p>Página não encontrada</p>
{:else}
    <p>Ocorreu um erro inesperado</p>
{/if}

<a href="/">← Voltar para a página inicial</a>