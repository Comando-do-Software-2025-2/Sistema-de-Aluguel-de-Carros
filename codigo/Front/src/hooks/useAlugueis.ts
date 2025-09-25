import { useState, useEffect } from 'react';
import { AluguelPedido, AluguelPedidoFormData } from '@/types/aluguel';
import { useToast } from './use-toast';

export const useAlugueis = () => {
  const [alugueis, setAlugueis] = useState<AluguelPedido[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Dados mock para demonstração
  const mockAlugueis: AluguelPedido[] = [
    {
      id: 1,
      cliente: {
        id: 1,
        nome: 'João Silva',
        rg: '12.345.678-9',
        cpf: '123.456.789-00',
        endereco: 'Rua das Flores, 123',
        profissao: 'Engenheiro'
      },
      automovel: {
        id: 1,
        matricula: 'MAT001',
        ano: 2022,
        marca: 'Toyota',
        modelo: 'Corolla',
        placa: 'ABC-1234'
      },
      status: 'APROVADO',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: 2,
      cliente: {
        id: 2,
        nome: 'Maria Santos',
        rg: '98.765.432-1',
        cpf: '987.654.321-00',
        endereco: 'Av. Principal, 456',
        profissao: 'Médica'
      },
      automovel: {
        id: 2,
        matricula: 'MAT002',
        ano: 2021,
        marca: 'Honda',
        modelo: 'Civic',
        placa: 'XYZ-5678'
      },
      status: 'AGURADANDO_ANALISE',
      createdAt: '2024-01-16T09:15:00Z',
      updatedAt: '2024-01-16T09:15:00Z'
    }
  ];

  useEffect(() => {
    // Simula carregamento de dados
    setLoading(true);
    setTimeout(() => {
      setAlugueis(mockAlugueis);
      setLoading(false);
    }, 500);
  }, []);

  const adicionarAluguel = (data: AluguelPedidoFormData) => {
    try {
      // Simula adição no backend
      const novoAluguel: AluguelPedido = {
        id: Date.now(),
        cliente: mockAlugueis[0].cliente, // Mock - deveria buscar pelo clienteId
        automovel: mockAlugueis[0].automovel, // Mock - deveria buscar pelo automovelId
        status: data.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setAlugueis(prev => [...prev, novoAluguel]);
      
      toast({
        title: "Aluguel criado",
        description: "Pedido de aluguel foi criado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o pedido de aluguel.",
        variant: "destructive",
      });
    }
  };

  const editarAluguel = (id: number, data: Partial<AluguelPedidoFormData>) => {
    try {
      setAlugueis(prev => 
        prev.map(aluguel => 
          aluguel.id === id 
            ? { 
                ...aluguel, 
                status: data.status || aluguel.status,
                updatedAt: new Date().toISOString()
              }
            : aluguel
        )
      );
      
      toast({
        title: "Aluguel atualizado",
        description: "Pedido de aluguel foi atualizado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o pedido de aluguel.",
        variant: "destructive",
      });
    }
  };

  const excluirAluguel = (id: number) => {
    try {
      setAlugueis(prev => prev.filter(aluguel => aluguel.id !== id));
      
      toast({
        title: "Aluguel excluído",
        description: "Pedido de aluguel foi removido com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o pedido de aluguel.",
        variant: "destructive",
      });
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