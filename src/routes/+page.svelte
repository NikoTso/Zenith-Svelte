
<script lang="ts">
  import TarefaCard from '#lib/components/TarefaCard.svelte'

  const tarefa = {
    titulo: 'Criar página inicial',
    descricao: 'Desenvolver a interface do projeto.',
    status: 'Em andamento',
    prioridade: 'alta',
    responsavel: 'Pedro',
    prazo: '20/10/2026'
  }
</script>

<h1>Teste do cartão de tarefa</h1>

<TarefaCard {tarefa} />
