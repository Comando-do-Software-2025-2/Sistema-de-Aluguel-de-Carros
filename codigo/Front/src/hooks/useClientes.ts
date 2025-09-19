import { useState, useCallback } from 'react';
import { Cliente, ClienteFormData } from '@/types/cliente';

const INITIAL_CLIENTES: Cliente[] = [
  {
    id: 1,
    nome: 'João Silva',
    rg: '12.345.678-9',
    cpf: '123.456.789-00',
    endereco: 'Rua das Flores, 123, Centro, São Paulo, SP, 01234-567',
    profissao: 'Engenheiro'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    rg: '98.765.432-1',
    cpf: '987.654.321-00',
    endereco: 'Av. Principal, 456, Jardins, São Paulo, SP, 04567-890',
    profissao: 'Médica'
  }
];

export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>(INITIAL_CLIENTES);

  const adicionarCliente = useCallback((data: ClienteFormData) => {
    const novoCliente: Cliente = {
      id: Math.floor(Math.random() * 1000000),
      nome: data.nome,
      rg: data.rg,
      cpf: data.cpf,
      endereco: data.endereco,
      profissao: data.profissao
    };
    setClientes(prev => [...prev, novoCliente]);
    return novoCliente;
  }, []);

  const editarCliente = useCallback((id: number, data: ClienteFormData) => {
    setClientes(prev => prev.map(cliente => 
      cliente.id === id 
        ? {
            ...cliente,
            nome: data.nome,
            rg: data.rg,
            cpf: data.cpf,
            endereco: data.endereco,
            profissao: data.profissao
          }
        : cliente
    ));
  }, []);

  const excluirCliente = useCallback((id: number) => {
    setClientes(prev => prev.filter(cliente => cliente.id !== id));
  }, []);

  const obterClientePorId = useCallback((id: number) => {
    return clientes.find(cliente => cliente.id === id);
  }, [clientes]);

  return {
    clientes,
    adicionarCliente,
    editarCliente,
    excluirCliente,
    obterClientePorId
  };
};