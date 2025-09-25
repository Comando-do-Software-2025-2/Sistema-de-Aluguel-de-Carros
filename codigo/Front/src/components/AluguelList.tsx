import { useState } from 'react';
import { AluguelPedido } from '@/types/aluguel';
import { Cliente } from '@/types/cliente';
import { Veiculo } from '@/types/veiculo';
import { statusLabels, statusColors } from '@/types/aluguel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';

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
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'Nenhum aluguel encontrado com os filtros aplicados.' : 'Nenhum aluguel cadastrado.'}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead>Placa</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Criação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlugueis.map((aluguel) => (
                    <TableRow key={aluguel.id}>
                      <TableCell className="font-medium">#{aluguel.id}</TableCell>
                      <TableCell>{aluguel.cliente.nome}</TableCell>
                      <TableCell>{aluguel.cliente.cpf}</TableCell>
                      <TableCell>
                        {aluguel.automovel.marca} {aluguel.automovel.modelo} ({aluguel.automovel.ano})
                      </TableCell>
                      <TableCell>{aluguel.automovel.placa}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[aluguel.status]}>
                          {statusLabels[aluguel.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(aluguel.createdAt)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {onView && (
                              <DropdownMenuItem onClick={() => onView(aluguel)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Visualizar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => onEdit(aluguel)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onDelete(aluguel.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            Total: {filteredAlugueis.length} aluguel(is)
            {searchTerm && ` (filtrado de ${alugueis.length})`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};