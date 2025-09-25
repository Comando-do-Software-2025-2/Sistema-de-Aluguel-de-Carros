import { useState } from 'react';
import { AluguelList } from '@/components/AluguelList';
import { AluguelForm } from '@/components/AluguelForm';
import { useAlugueis } from '@/hooks/useAlugueis';
import { AluguelPedido, AluguelPedidoFormData } from '@/types/aluguel';
import { useToast } from '@/hooks/use-toast';

type View = 'list' | 'form' | 'view';

export const Alugueis = () => {
  const { alugueis, loading, adicionarAluguel, editarAluguel, excluirAluguel } = useAlugueis();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<View>('list');
  const [aluguelEditando, setAluguelEditando] = useState<AluguelPedido | undefined>();
  const [aluguelVisualizando, setAluguelVisualizando] = useState<AluguelPedido | undefined>();

  const handleAddAluguel = () => {
    setAluguelEditando(undefined);
    setCurrentView('form');
  };

  const handleEditAluguel = (aluguel: AluguelPedido) => {
    setAluguelEditando(aluguel);
    setCurrentView('form');
  };

  const handleViewAluguel = (aluguel: AluguelPedido) => {
    setAluguelVisualizando(aluguel);
    setCurrentView('view');
  };

  const handleDeleteAluguel = (id: number) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este pedido de aluguel?');
    if (confirmar) {
      excluirAluguel(id);
    }
  };

  const handleSaveAluguel = (data: AluguelPedidoFormData) => {
    if (aluguelEditando) {
      editarAluguel(aluguelEditando.id, data);
      toast({
        title: "Aluguel atualizado",
        description: "Pedido de aluguel foi atualizado com sucesso.",
      });
    } else {
      adicionarAluguel(data);
      toast({
        title: "Aluguel criado",
        description: "Novo pedido de aluguel foi criado com sucesso.",
      });
    }
    setCurrentView('list');
    setAluguelEditando(undefined);
  };

  const handleCancelForm = () => {
    setCurrentView('list');
    setAluguelEditando(undefined);
    setAluguelVisualizando(undefined);
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-7xl mx-auto">
        {currentView === 'list' ? (
          <AluguelList
            alugueis={alugueis}
            loading={loading}
            onAdd={handleAddAluguel}
            onEdit={handleEditAluguel}
            onDelete={handleDeleteAluguel}
            onView={handleViewAluguel}
          />
        ) : currentView === 'form' ? (
          <AluguelForm
            aluguel={aluguelEditando}
            onSave={handleSaveAluguel}
            onCancel={handleCancelForm}
          />
        ) : (
          // View mode would be implemented here if needed
          <div>Vista de detalhes não implementada ainda</div>
        )}
      </div>
    </div>
  );
};