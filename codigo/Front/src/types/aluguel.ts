import { Cliente } from './cliente';
import { Veiculo } from './veiculo';

export type AluguelPedidoStatus = 
  | 'AGURADANDO_ANALISE'
  | 'EM_ANALISE' 
  | 'APROVADO'
  | 'REJEITADO'
  | 'CANCELADO';

export interface AluguelPedido {
  id: number;
  cliente: Cliente;
  automovel: Veiculo;
  status: AluguelPedidoStatus;
  createdAt: string;
  updatedAt: string;
  contratoId?: number;
}

export interface AluguelPedidoFormData {
  clienteId: number;
  automovelId: number;
  status: AluguelPedidoStatus;
}

export const statusLabels: Record<AluguelPedidoStatus, string> = {
  AGURADANDO_ANALISE: 'Aguardando Análise',
  EM_ANALISE: 'Em Análise',
  APROVADO: 'Aprovado',
  REJEITADO: 'Rejeitado',
  CANCELADO: 'Cancelado'
};

export const statusColors: Record<AluguelPedidoStatus, string> = {
  AGURADANDO_ANALISE: 'bg-yellow-100 text-yellow-800',
  EM_ANALISE: 'bg-blue-100 text-blue-800',
  APROVADO: 'bg-green-100 text-green-800',
  REJEITADO: 'bg-red-100 text-red-800',
  CANCELADO: 'bg-gray-100 text-gray-800'
};