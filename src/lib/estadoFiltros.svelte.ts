import type { Prioridade, Status, Tarefa } from '../tipos'

export const filtros = $state({
  busca: '',
  statusSelecionado: '' as Status | '',
  prioridadeSelecionada: '' as Prioridade | ''
})

export function filtrarTarefas(tarefas: Tarefa[]): Tarefa[] {
  const termo = filtros.busca.trim().toLocaleLowerCase()

  return tarefas.filter((tarefa) => {
    const correspondeTitulo =
      tarefa.titulo.toLocaleLowerCase().includes(termo)

    const correspondeStatus =
      filtros.statusSelecionado === '' ||
      tarefa.status === filtros.statusSelecionado

    const correspondePrioridade =
      filtros.prioridadeSelecionada === '' ||
      tarefa.prioridade === filtros.prioridadeSelecionada

    return (
      correspondeTitulo &&
      correspondeStatus &&
      correspondePrioridade
    )
  })
}