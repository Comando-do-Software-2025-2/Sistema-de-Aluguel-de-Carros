import { useState } from 'react';
import { Contrato } from '@/types/contrato';
import { contratoStatusLabels, contratoStatusColors } from '@/types/contrato';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Eye, Calendar, FileText } from 'lucide-react';

interface ContratoListProps {
  contratos: Contrato[];
  loading?: boolean;
  onAdd: () => void;
  onEdit: (contrato: Contrato) => void;
  onDelete: (id: number) => void;
  onView?: (contrato: Contrato) => void;
}

export const ContratoList = ({ 
  contratos, 
  loading = false, 
  onAdd, 
  onEdit, 
  onDelete,
  onView 
}: ContratoListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContratos = contratos.filter(contrato => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return contrato.pedido.cliente.nome.toLowerCase().includes(searchLower) ||
           contrato.pedido.cliente.cpf.includes(searchTerm) ||
           contrato.pedido.automovel.marca.toLowerCase().includes(searchLower) ||
           contrato.pedido.automovel.modelo.toLowerCase().includes(searchLower) ||
           contrato.pedido.automovel.placa.toLowerCase().includes(searchLower) ||
           contrato.id.toString().includes(searchTerm);
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const calculateDuration = (dataInicio: string, dataFim: string) => {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diff = fim.getTime() - inicio.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Carregando contratos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Gerenciar Contratos
            </CardTitle>
            <Button onClick={onAdd} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Contrato
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar por cliente, veículo, placa ou ID do contrato..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredContratos.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {searchTerm ? 'Nenhum contrato encontrado' : 'Nenhum contrato cadastrado'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm 
                    ? 'Tente ajustar os filtros de busca para encontrar contratos.' 
                    : 'Comece criando seu primeiro contrato de aluguel.'
                  }
                </p>
                {!searchTerm && (
                  <Button onClick={onAdd} className="mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeiro Contrato
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredContratos.map((contrato) => (
                <Card key={contrato.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Contrato #{contrato.id}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Pedido #{contrato.pedido.id}
                          </p>
                        </div>
                      </div>
                      <Badge className={contratoStatusColors[contrato.status]}>
                        {contratoStatusLabels[contrato.status]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">◉</span>
                          </div>
                          <span className="font-medium text-sm">Cliente</span>
                        </div>
                        <p className="text-sm font-semibold">{contrato.pedido.cliente.nome}</p>
                        <p className="text-xs text-muted-foreground">CPF: {contrato.pedido.cliente.cpf}</p>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">◐</span>
                          </div>
                          <span className="font-medium text-sm">Veículo</span>
                        </div>
                        <p className="text-sm font-semibold">
                          {contrato.pedido.automovel.marca} {contrato.pedido.automovel.modelo} ({contrato.pedido.automovel.ano})
                        </p>
                        <p className="text-xs text-muted-foreground">Placa: {contrato.pedido.automovel.placa}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Calendar className="h-3 w-3 text-primary" />
                            <span className="text-xs font-medium">Início</span>
                          </div>
                          <p className="text-sm font-semibold">{formatDate(contrato.dataInicio)}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Calendar className="h-3 w-3 text-primary" />
                            <span className="text-xs font-medium">Fim</span>
                          </div>
                          <p className="text-sm font-semibold">{formatDate(contrato.dataFim)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Duração: {calculateDuration(contrato.dataInicio, contrato.dataFim)} dias</span>
                        {contrato.contratoDeCredito && (
                          <span>Com financiamento</span>
                        )}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        {onView && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onView(contrato)}
                            className="flex-1"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onEdit(contrato)}
                          className="flex-1"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onDelete(contrato.id)}
                          className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredContratos.length > 0 && (
            <Card className="mt-6">
              <CardContent className="py-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Exibindo {filteredContratos.length} de {contratos.length} contratos
                  </span>
                  {searchTerm && (
                    <Badge variant="secondary" className="text-xs">
                      Filtrado
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};