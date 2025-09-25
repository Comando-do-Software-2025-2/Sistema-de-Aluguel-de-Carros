
import { useState, useCallback, useEffect } from 'react';
import { Cliente, ClienteFormData } from '@/types/cliente';

const API_URL = 'http://localhost:8080/clientes';

export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar todos os clientes
  const fetchClientes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Erro ao buscar clientes');
      const data = await res.json();
      setClientes(data);
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  // Adicionar cliente
  const adicionarCliente = useCallback(async (data: ClienteFormData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Enviando dados para o backend:', data);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      console.log('Resposta do servidor:', res.status, res.statusText);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Erro do servidor:', errorText);
        throw new Error(`Erro ${res.status}: ${errorText || 'Erro ao adicionar cliente'}`);
      }
      
      const novoCliente = await res.json();
      console.log('Cliente criado:', novoCliente);
      setClientes(prev => [...prev, novoCliente]);
      return novoCliente;
    } catch (err: any) {
      console.error('Erro no cadastro:', err);
      setError(err.message || 'Erro desconhecido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Editar cliente
  const editarCliente = useCallback(async (id: number, data: ClienteFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Erro ao editar cliente');
      const clienteAtualizado = await res.json();
      setClientes(prev => prev.map(c => c.id === id ? { ...c, ...clienteAtualizado } : c));
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Excluir cliente
  const excluirCliente = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao excluir cliente');
      setClientes(prev => prev.filter(cliente => cliente.id !== id));
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obter cliente por id
  const obterClientePorId = useCallback((id: number) => {
    return clientes.find(cliente => cliente.id === id);
  }, [clientes]);

  return {
    clientes,
    loading,
    error,
    fetchClientes,
    adicionarCliente,
    editarCliente,
    excluirCliente,
    obterClientePorId
  };
};