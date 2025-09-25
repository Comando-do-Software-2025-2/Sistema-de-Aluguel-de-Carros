import { useState } from 'react';
import { ClienteList } from '@/components/ClienteList';
import { ClienteForm } from '@/components/ClienteForm';
import { useClientes } from '@/hooks/useClientes';
import { Cliente } from '@/types/cliente';
import { useToast } from '@/hooks/use-toast';

type View = 'list' | 'form';

export const Clientes = () => {
  const { clientes, adicionarCliente, editarCliente, excluirCliente } = useClientes();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<View>('list');
  const [clienteEditando, setClienteEditando] = useState<Cliente | undefined>();

  const handleAddCliente = () => {
    setClienteEditando(undefined);
    setCurrentView('form');
  };

  const handleEditCliente = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setCurrentView('form');
  };

  const handleDeleteCliente = (id: number) => {
    excluirCliente(id);
    toast({
      title: "Cliente excluído",
      description: "Cliente foi removido com sucesso.",
    });
  };

  const handleSaveCliente = async (data: any) => {
    try {
      if (clienteEditando) {
        await editarCliente(clienteEditando.id, data);
        toast({
          title: "Cliente atualizado",
          description: "Cliente foi atualizado com sucesso.",
        });
      } else {
        await adicionarCliente(data);
        toast({
          title: "Cliente cadastrado",
          description: "Cliente foi cadastrado com sucesso.",
        });
      }
      setCurrentView('list');
      setClienteEditando(undefined);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao salvar o cliente.",
        variant: "destructive",
      });
    }
  };

  const handleCancelForm = () => {
    setCurrentView('list');
    setClienteEditando(undefined);
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-7xl mx-auto">
        {currentView === 'list' ? (
          <ClienteList
            clientes={clientes}
            onAdd={handleAddCliente}
            onEdit={handleEditCliente}
            onDelete={handleDeleteCliente}
          />
        ) : (
          <ClienteForm
            cliente={clienteEditando}
            onSave={handleSaveCliente}
            onCancel={handleCancelForm}
          />
        )}
      </div>
    </div>
  );
};