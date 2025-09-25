import { useState } from 'react';
import { ContratoList } from '@/components/ContratoList';
import { ContratoForm } from '@/components/ContratoForm';
import { useContratos } from '@/hooks/useContratos';
import { Contrato, ContratoFormData } from '@/types/contrato';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/ui/navbar';

type View = 'list' | 'form' | 'view';

export const Contratos = () => {
  const { contratos, loading, adicionarContrato, editarContrato, excluirContrato } = useContratos();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<View>('list');
  const [contratoEditando, setContratoEditando] = useState<Contrato | undefined>();
  const [contratoVisualizando, setContratoVisualizando] = useState<Contrato | undefined>();

  const handleAddContrato = () => {
    setContratoEditando(undefined);
    setCurrentView('form');
  };

  const handleEditContrato = (contrato: Contrato) => {
    setContratoEditando(contrato);
    setCurrentView('form');
  };

  const handleViewContrato = (contrato: Contrato) => {
    setContratoVisualizando(contrato);
    setCurrentView('view');
  };

  const handleDeleteContrato = (id: number) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este contrato?');
    if (confirmar) {
      excluirContrato(id);
      toast({
        title: "Contrato excluído",
        description: "Contrato foi removido com sucesso.",
      });
    }
  };

  const handleSaveContrato = async (data: ContratoFormData) => {
    try {
      if (contratoEditando) {
        await editarContrato(contratoEditando.id, data);
        toast({
          title: "Contrato atualizado",
          description: "Contrato foi atualizado com sucesso.",
        });
      } else {
        await adicionarContrato(data);
        toast({
          title: "Contrato criado",
          description: "Novo contrato foi criado com sucesso.",
        });
      }
      setCurrentView('list');
      setContratoEditando(undefined);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao salvar o contrato.",
        variant: "destructive",
      });
    }
  };

  const handleCancelForm = () => {
    setCurrentView('list');
    setContratoEditando(undefined);
    setContratoVisualizando(undefined);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {currentView === 'list' ? (
            <ContratoList
              contratos={contratos}
              loading={loading}
              onAdd={handleAddContrato}
              onEdit={handleEditContrato}
              onDelete={handleDeleteContrato}
              onView={handleViewContrato}
            />
          ) : currentView === 'form' ? (
            <ContratoForm
              contrato={contratoEditando}
              onSave={handleSaveContrato}
              onCancel={handleCancelForm}
            />
          ) : (
            // View mode would be implemented here if needed
            <div>Vista de detalhes não implementada ainda</div>
          )}
        </div>
      </div>
    </div>
  );
};