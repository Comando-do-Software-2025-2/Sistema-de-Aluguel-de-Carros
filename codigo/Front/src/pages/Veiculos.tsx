import { useState } from 'react';
import { VeiculoList } from '@/components/VeiculosList';
import { VeiculoForm } from '@/components/VeiculosForm';
import { useVeiculos } from '@/hooks/useVeiculos';
import { Veiculo } from '@/types/veiculo';
import { useToast } from '@/hooks/use-toast';

type View = 'list' | 'form';

export const Veiculos = () => {
  const { veiculos, adicionarVeiculo, editarVeiculo, excluirVeiculo } = useVeiculos();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<View>('list');
  const [veiculoEditando, setVeiculoEditando] = useState<Veiculo | undefined>();

  const handleAddVeiculo = () => {
    setVeiculoEditando(undefined);
    setCurrentView('form');
  };

  const handleEditVeiculo = (veiculo: Veiculo) => {
    setVeiculoEditando(veiculo);
    setCurrentView('form');
  };

  const handleDeleteVeiculo = (id: number) => {
    excluirVeiculo(id);
    toast({
      title: "Veículo excluído",
      description: "Veículo foi removido com sucesso.",
    });
  };

  const handleSaveVeiculo = (data: any) => {
    if (veiculoEditando) {
      editarVeiculo(veiculoEditando.id, data);
    } else {
      adicionarVeiculo(data);
    }
    setCurrentView('list');
    setVeiculoEditando(undefined);
  };

  const handleCancelForm = () => {
    setCurrentView('list');
    setVeiculoEditando(undefined);
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-7xl mx-auto">
        {currentView === 'list' ? (
          <VeiculoList
            veiculos={veiculos}
            onAdd={handleAddVeiculo}
            onEdit={handleEditVeiculo}
            onDelete={handleDeleteVeiculo}
          />
        ) : (
          <VeiculoForm
            veiculo={veiculoEditando}
            onSave={handleSaveVeiculo}
            onCancel={handleCancelForm}
          />
        )}
      </div>
    </div>
  );
};