import { useState, useCallback } from 'react';
import { Cliente, ClienteFormData } from '@/types/cliente';

const INITIAL_CLIENTES: Cliente[] = [
  {
    id: '1',
    nome: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-9999',
    endereco: {
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      cep: '01234-567',
      estado: 'SP'
    },
    dataNascimento: '1990-01-15',
    status: 'ativo',
    dataRegistro: '2024-01-15'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    cpf: '987.654.321-00',
    email: 'maria.santos@email.com',
    telefone: '(11) 88888-8888',
    endereco: {
      rua: 'Av. Principal',
      numero: '456',
      bairro: 'Jardins',
      cidade: 'São Paulo',
      cep: '04567-890',
      estado: 'SP'
    },
    dataNascimento: '1985-03-22',
    status: 'ativo',
    dataRegistro: '2024-02-10'
  }
];

export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>(INITIAL_CLIENTES);

  const adicionarCliente = useCallback((data: ClienteFormData) => {
    const novoCliente: Cliente = {
      id: Math.random().toString(36).substr(2, 9),
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
      telefone: data.telefone,
      endereco: {
        rua: data.rua,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        cep: data.cep,
        estado: data.estado
      },
      dataNascimento: data.dataNascimento,
      status: data.status,
      dataRegistro: new Date().toISOString().split('T')[0]
    };

    setClientes(prev => [...prev, novoCliente]);
    return novoCliente;
  }, []);

  const editarCliente = useCallback((id: string, data: ClienteFormData) => {
    setClientes(prev => prev.map(cliente => 
      cliente.id === id 
        ? {
            ...cliente,
            nome: data.nome,
            cpf: data.cpf,
            email: data.email,
            telefone: data.telefone,
            endereco: {
              rua: data.rua,
              numero: data.numero,
              bairro: data.bairro,
              cidade: data.cidade,
              cep: data.cep,
              estado: data.estado
            },
            dataNascimento: data.dataNascimento,
            status: data.status
          }
        : cliente
    ));
  }, []);

  const excluirCliente = useCallback((id: string) => {
    setClientes(prev => prev.filter(cliente => cliente.id !== id));
  }, []);

  const obterClientePorId = useCallback((id: string) => {
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