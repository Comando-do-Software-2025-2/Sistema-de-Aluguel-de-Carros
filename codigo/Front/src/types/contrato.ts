import { AluguelPedido } from './aluguel';

export type ContratoStatus = 
  | 'ATIVO'
  | 'TERMINADO' 
  | 'RESCINDIDO';

export interface ContratoDeCredito {
  id: number;
  bancoConcessor: {
    id: number;
    nome: string;
  };
  valorFinanciado: number;
  numeroDeParcelas: number;
}

export interface Contrato {
  id: number;
  pedido: AluguelPedido;
  contratoDeCredito?: ContratoDeCredito;
  dataInicio: string;
  dataFim: string;
  status: ContratoStatus;
}

export interface ContratoFormData {
  pedidoId: number;
  dataInicio: string;
  dataFim: string;
  status: ContratoStatus;
  // Dados do contrato de crédito (opcionais)
  bancoConcessorId?: number;
  valorFinanciado?: number;
  numeroDeParcelas?: number;
}

export const contratoStatusLabels: Record<ContratoStatus, string> = {
  ATIVO: 'Ativo',
  TERMINADO: 'Terminado',
  RESCINDIDO: 'Rescindido'
};

export const contratoStatusColors: Record<ContratoStatus, string> = {
  ATIVO: 'bg-green-100 text-green-800',
  TERMINADO: 'bg-gray-100 text-gray-800',
  RESCINDIDO: 'bg-red-100 text-red-800'
};