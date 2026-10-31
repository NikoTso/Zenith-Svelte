import type { Status } from '../tipos'

export const opcoesStatus: { valor: Status; rotulo: string }[] = [
  { valor: 'a-fazer', rotulo: 'A fazer' },
  { valor: 'em-andamento', rotulo: 'Em andamento' },
  { valor: 'em-revisao', rotulo: 'Em revisão' },
  { valor: 'concluida', rotulo: 'Concluída' }
]

export function rotuloStatus(status: Status): string {
  return opcoesStatus.find((opcao) => opcao.valor === status)?.rotulo ?? status
}
