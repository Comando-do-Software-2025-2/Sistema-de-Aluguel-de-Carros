import { useState, useEffect, useCallback } from 'react';
import { AluguelPedido, AluguelPedidoFormData } from '@/types/aluguel';
import { useToast } from './use-toast';

const API_URL = 'http://localhost:8080/alugueis';

export const useAlugueis = () => {
  const [alugueis, setAlugueis] = useState<AluguelPedido[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Buscar todos os aluguéis
  const fetchAlugueis = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao buscar aluguéis');
      const data = await response.json();
      setAlugueis(data);
    } catch (error) {
      console.error('Erro ao buscar aluguéis:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os aluguéis.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAlugueis();
  }, [fetchAlugueis]);

  const adicionarAluguel = async (data: AluguelPedidoFormData) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Erro ao criar pedido de aluguel');
      
      const novoAluguel = await response.json();
      setAlugueis(prev => [...prev, novoAluguel]);
      
      toast({
        title: "Aluguel criado",
        description: "Pedido de aluguel foi criado com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao criar aluguel:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o pedido de aluguel.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const editarAluguel = async (id: number, data: Partial<AluguelPedidoFormData>) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Erro ao atualizar pedido de aluguel');
      
      const aluguelAtualizado = await response.json();
      setAlugueis(prev => 
        prev.map(aluguel => 
          aluguel.id === id ? aluguelAtualizado : aluguel
        )
      );
      
      toast({
        title: "Aluguel atualizado",
        description: "Pedido de aluguel foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao atualizar aluguel:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o pedido de aluguel.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const excluirAluguel = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Erro ao excluir pedido de aluguel');
      
      setAlugueis(prev => prev.filter(aluguel => aluguel.id !== id));
      
      toast({
        title: "Aluguel excluído",
        description: "Pedido de aluguel foi removido com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao excluir aluguel:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o pedido de aluguel.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    alugueis,
    loading,
    adicionarAluguel,
    editarAluguel,
    excluirAluguel
  };
};