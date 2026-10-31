
<script lang="ts">
    let { ativa }: { ativa: 'lista' | 'quadro' } = $props();
</script>

<nav class="alternador" aria-label="Visualização das tarefas">
    <a
        href="/"
        class:selecionado={ativa === 'lista'}
        aria-current={ativa === 'lista' ? 'page' : undefined}
    >
        Lista
    </a>

    <a
        href="/quadro"
        class:selecionado={ativa === 'quadro'}
        aria-current={ativa === 'quadro' ? 'page' : undefined}
    >
        Quadro
    </a>
</nav>

<style>
    .alternador {
        display: inline-flex;
        gap: 0.25rem;
        padding: 0.3rem;
        margin-bottom: 1.5rem;
        background: #0e1538;
        border: 1px solid #394773;
        border-radius: 0.5rem;
    }

    a {
        padding: 0.55rem 1.2rem;
        color: #a9b4d6;
        font-weight: 600;
        text-decoration: none;
        border-radius: 0.35rem;
        transition: background 0.2s, color 0.2s;
    }

    a:hover {
        color: white;
        background: #232e60;
    }

    a.selecionado {
        color: #14102a;
        background: #e8b94a;
    }

    a:focus-visible {
        outline: 2px solid #f5cf6b;
        outline-offset: 3px;
    }
</style>
