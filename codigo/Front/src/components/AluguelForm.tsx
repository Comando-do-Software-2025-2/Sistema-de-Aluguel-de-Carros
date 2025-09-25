import { useState, useEffect } from 'react';
import { AluguelPedido, AluguelPedidoFormData, AluguelPedidoStatus, statusLabels } from '@/types/aluguel';
import { Cliente } from '@/types/cliente';
import { Veiculo } from '@/types/veiculo';
import { useClientes } from '@/hooks/useClientes';
import { useVeiculos } from '@/hooks/useVeiculos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, ArrowLeft, Search, User, Car } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AluguelFormProps {
  aluguel?: AluguelPedido;
  onSave: (data: AluguelPedidoFormData) => void;
  onCancel: () => void;
}

export const AluguelForm = ({ aluguel, onSave, onCancel }: AluguelFormProps) => {
  const { clientes } = useClientes();
  const { veiculos } = useVeiculos();
  
  const [formData, setFormData] = useState<AluguelPedidoFormData>({
    clienteId: aluguel?.cliente.id || 0,
    automovelId: aluguel?.automovel.id || 0,
    status: aluguel?.status || 'AGURADANDO_ANALISE'
  });

  const [clienteOpen, setClienteOpen] = useState(false);
  const [veiculoOpen, setVeiculoOpen] = useState(false);
  const [clienteSearch, setClienteSearch] = useState('');
  const [veiculoSearch, setVeiculoSearch] = useState('');
  
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(
    aluguel?.cliente || null
  );
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(
    aluguel?.automovel || null
  );

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(clienteSearch.toLowerCase()) ||
    cliente.cpf.includes(clienteSearch) ||
    cliente.rg.includes(clienteSearch)
  );

  const filteredVeiculos = veiculos.filter(veiculo =>
    veiculo.marca.toLowerCase().includes(veiculoSearch.toLowerCase()) ||
    veiculo.modelo.toLowerCase().includes(veiculoSearch.toLowerCase()) ||
    veiculo.placa.toLowerCase().includes(veiculoSearch.toLowerCase()) ||
    veiculo.matricula.toLowerCase().includes(veiculoSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCliente || !selectedVeiculo) {
      alert('Por favor, selecione um cliente e um veículo.');
      return;
    }

    onSave({
      ...formData,
      clienteId: selectedCliente.id,
      automovelId: selectedVeiculo.id
    });
  };

  const handleClienteSelect = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setFormData(prev => ({ ...prev, clienteId: cliente.id }));
    setClienteOpen(false);
    setClienteSearch('');
  };

  const handleVeiculoSelect = (veiculo: Veiculo) => {
    setSelectedVeiculo(veiculo);
    setFormData(prev => ({ ...prev, automovelId: veiculo.id }));
    setVeiculoOpen(false);
    setVeiculoSearch('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl font-bold">
              {aluguel ? 'Editar Aluguel' : 'Novo Aluguel'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seção de Cliente */}
            <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Dados do Cliente</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente *</Label>
                <Popover open={clienteOpen} onOpenChange={setClienteOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={clienteOpen}
                      className="w-full justify-between"
                    >
                      {selectedCliente ? (
                        <span>{selectedCliente.nome} - {selectedCliente.cpf}</span>
                      ) : (
                        <span className="text-muted-foreground">Pesquisar cliente...</span>
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput 
                        placeholder="Pesquisar por nome, CPF ou RG..." 
                        value={clienteSearch}
                        onValueChange={setClienteSearch}
                      />
                      <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {filteredClientes.map((cliente) => (
                          <CommandItem
                            key={cliente.id}
                            onSelect={() => handleClienteSelect(cliente)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCliente?.id === cliente.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{cliente.nome}</span>
                              <span className="text-sm text-muted-foreground">
                                CPF: {cliente.cpf} | RG: {cliente.rg}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {selectedCliente && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-background rounded border">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Nome</Label>
                    <p className="text-sm">{selectedCliente.nome}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">CPF</Label>
                    <p className="text-sm">{selectedCliente.cpf}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">RG</Label>
                    <p className="text-sm">{selectedCliente.rg}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Profissão</Label>
                    <p className="text-sm">{selectedCliente.profissao || 'Não informado'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-muted-foreground">Endereço</Label>
                    <p className="text-sm">{selectedCliente.endereco}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Seção de Veículo */}
            <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
              <div className="flex items-center gap-2 mb-4">
                <Car className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Dados do Veículo</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="veiculo">Veículo *</Label>
                <Popover open={veiculoOpen} onOpenChange={setVeiculoOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={veiculoOpen}
                      className="w-full justify-between"
                    >
                      {selectedVeiculo ? (
                        <span>{selectedVeiculo.marca} {selectedVeiculo.modelo} - {selectedVeiculo.placa}</span>
                      ) : (
                        <span className="text-muted-foreground">Pesquisar veículo...</span>
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput 
                        placeholder="Pesquisar por marca, modelo, placa..." 
                        value={veiculoSearch}
                        onValueChange={setVeiculoSearch}
                      />
                      <CommandEmpty>Nenhum veículo encontrado.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {filteredVeiculos.map((veiculo) => (
                          <CommandItem
                            key={veiculo.id}
                            onSelect={() => handleVeiculoSelect(veiculo)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedVeiculo?.id === veiculo.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {veiculo.marca} {veiculo.modelo} ({veiculo.ano})
                              </span>
                              <span className="text-sm text-muted-foreground">
                                Placa: {veiculo.placa} | Matrícula: {veiculo.matricula}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {selectedVeiculo && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-background rounded border">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Marca/Modelo</Label>
                    <p className="text-sm">{selectedVeiculo.marca} {selectedVeiculo.modelo}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Ano</Label>
                    <p className="text-sm">{selectedVeiculo.ano}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Placa</Label>
                    <p className="text-sm">{selectedVeiculo.placa}</p>
                  </div>
                  <div className="md:col-span-3">
                    <Label className="text-sm font-medium text-muted-foreground">Matrícula</Label>
                    <p className="text-sm">{selectedVeiculo.matricula}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status do Pedido *</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: AluguelPedidoStatus) => 
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={!selectedCliente || !selectedVeiculo}
              >
                {aluguel ? 'Atualizar Aluguel' : 'Criar Aluguel'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};