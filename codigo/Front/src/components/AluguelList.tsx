import { useState } from 'react';
import { AluguelPedido } from '@/types/aluguel';
import { Cliente } from '@/types/cliente';
import { Veiculo } from '@/types/veiculo';
import { statusLabels, statusColors } from '@/types/aluguel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';

interface AluguelListProps {
  alugueis: AluguelPedido[];
  loading?: boolean;
  onAdd: () => void;
  onEdit: (aluguel: AluguelPedido) => void;
  onDelete: (id: number) => void;
  onView?: (aluguel: AluguelPedido) => void;
}

export const AluguelList = ({ 
  alugueis, 
  loading = false, 
  onAdd, 
  onEdit, 
  onDelete,
  onView 
}: AluguelListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'cliente' | 'veiculo' | 'all'>('all');

  const filteredAlugueis = alugueis.filter(aluguel => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    switch (searchType) {
      case 'cliente':
        return aluguel.cliente.nome.toLowerCase().includes(searchLower) ||
               aluguel.cliente.cpf.includes(searchTerm);
      case 'veiculo':
        return aluguel.automovel.marca.toLowerCase().includes(searchLower) ||
               aluguel.automovel.modelo.toLowerCase().includes(searchLower) ||
               aluguel.automovel.placa.toLowerCase().includes(searchLower);
      default:
        return aluguel.cliente.nome.toLowerCase().includes(searchLower) ||
               aluguel.cliente.cpf.includes(searchTerm) ||
               aluguel.automovel.marca.toLowerCase().includes(searchLower) ||
               aluguel.automovel.modelo.toLowerCase().includes(searchLower) ||
               aluguel.automovel.placa.toLowerCase().includes(searchLower);
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Carregando alugueis...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Gerenciar Alugueis</CardTitle>
            <Button onClick={onAdd} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Aluguel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar por cliente, veículo ou placa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as any)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">Todos os campos</option>
              <option value="cliente">Somente Cliente</option>
              <option value="veiculo">Somente Veículo</option>
            </select>
          </div>

          {filteredAlugueis.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary">⊡</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {searchTerm ? 'Nenhum aluguel encontrado' : 'Nenhum aluguel cadastrado'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm 
                    ? 'Tente ajustar os filtros de busca para encontrar aluguéis.' 
                    : 'Comece criando seu primeiro pedido de aluguel.'
                  }
                </p>
                {!searchTerm && (
                  <Button onClick={onAdd} className="mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeiro Aluguel
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAlugueis.map((aluguel) => (
                <Card key={aluguel.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">#{aluguel.id}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{aluguel.cliente.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">CPF: {aluguel.cliente.cpf}</p>
                        </div>
                      </div>
                      <Badge className={statusColors[aluguel.status]}>
                        {statusLabels[aluguel.status]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">◐</span>
                          </div>
                          <span className="font-medium text-sm">Veículo</span>
                        </div>
                        <p className="text-sm font-semibold">
                          {aluguel.automovel.marca} {aluguel.automovel.modelo} ({aluguel.automovel.ano})
                        </p>
                        <p className="text-xs text-muted-foreground">Placa: {aluguel.automovel.placa}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Criado em: {formatDate(aluguel.createdAt)}</span>
                        {aluguel.contratoId && (
                          <span>Contrato: #{aluguel.contratoId}</span>
                        )}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        {onView && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onView(aluguel)}
                            className="flex-1"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onEdit(aluguel)}
                          className="flex-1"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onDelete(aluguel.id)}
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

          {filteredAlugueis.length > 0 && (
            <Card className="mt-6">
              <CardContent className="py-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Exibindo {filteredAlugueis.length} de {alugueis.length} aluguéis
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