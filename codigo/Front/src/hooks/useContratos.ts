import { useState, useEffect } from 'react';
import { Contrato, ContratoFormData } from '@/types/contrato';

// Mock data para desenvolvimento - substituir por API real
const mockContratos: Contrato[] = [];

export const useContratos = () => {
  const [contratos, setContratos] = useState<Contrato[]>(mockContratos);
  const [loading, setLoading] = useState(false);

  const adicionarContrato = async (dados: ContratoFormData) => {
    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const novoContrato: Contrato = {
        id: Date.now(),
        pedido: {
          id: dados.pedidoId,
          cliente: { id: 1, nome: 'Cliente Mock', email: '', senha: '', rg: '', cpf: '', endereco: '' },
          automovel: { id: 1, matricula: 'MOCK123', ano: 2023, marca: 'Mock', modelo: 'Model', placa: 'ABC-1234' },
          status: 'APROVADO',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        dataInicio: dados.dataInicio,
        dataFim: dados.dataFim,
        status: dados.status
      };

      setContratos(prev => [...prev, novoContrato]);
    } catch (error) {
      console.error('Erro ao adicionar contrato:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const editarContrato = async (id: number, dados: ContratoFormData) => {
    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setContratos(prev => prev.map(contrato => 
        contrato.id === id 
          ? { 
              ...contrato, 
              dataInicio: dados.dataInicio,
              dataFim: dados.dataFim,
              status: dados.status
            }
          : contrato
      ));
    } catch (error) {
      console.error('Erro ao editar contrato:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const excluirContrato = async (id: number) => {
    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setContratos(prev => prev.filter(contrato => contrato.id !== id));
    } catch (error) {
      console.error('Erro ao excluir contrato:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    contratos,
    loading,
    adicionarContrato,
    editarContrato,
    excluirContrato
  };
};