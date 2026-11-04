
<script lang="ts">
  let {
    mensagem = 'Carregando...'
  }: {
    mensagem?: string
  } = $props()
</script>

<div class="carregando" role="status" aria-live="polite">
  <span class="indicador" aria-hidden="true"></span>
  <span>{mensagem}</span>
</div>

<style>
  .carregando {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 0;
    color: var(--ink, #eef1fb);
  }

  .indicador {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border: 3px solid rgba(169, 180, 214, 0.3);
    border-top-color: var(--gold, #e8b94a);
    border-radius: 50%;
    animation: girar 0.75s linear infinite;
  }

  @keyframes girar {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .indicador {
      animation: none;
    }
  }
</style>
