import { useState, useCallback, useEffect } from 'react';
import { Veiculo, VeiculoFormData } from '@/types/veiculo';

const API_URL = 'http://localhost:8080/veiculos';

export const useVeiculos = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar todos os veículos
  const fetchVeiculos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Erro ao buscar veículos');
      const data = await res.json();
      setVeiculos(data);
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVeiculos();
  }, [fetchVeiculos]);

  // Adicionar veículo
  const adicionarVeiculo = useCallback(async (data: VeiculoFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Erro ao adicionar veículo');
      const novoVeiculo = await res.json();
      setVeiculos(prev => [...prev, novoVeiculo]);
      return novoVeiculo;
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Editar veículo
  const editarVeiculo = useCallback(async (id: number, data: VeiculoFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Erro ao editar veículo');
      const veiculoAtualizado = await res.json();
      setVeiculos(prev => prev.map(v => v.id === id ? { ...v, ...veiculoAtualizado } : v));
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Excluir veículo
  const excluirVeiculo = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao excluir veículo');
      setVeiculos(prev => prev.filter(veiculo => veiculo.id !== id));
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obter veículo por id
  const obterVeiculoPorId = useCallback((id: number) => {
    return veiculos.find(veiculo => veiculo.id === id);
  }, [veiculos]);

  return {
    veiculos,
    loading,
    error,
    fetchVeiculos,
    adicionarVeiculo,
    editarVeiculo,
    excluirVeiculo,
    obterVeiculoPorId
  };
};