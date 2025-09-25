import { useState, useEffect } from 'react';
import { Contrato, ContratoFormData, ContratoStatus, contratoStatusLabels } from '@/types/contrato';
import { AluguelPedidoStatus } from '@/types/aluguel';
import { useAlugueis } from '@/hooks/useAlugueis';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, ArrowLeft, Save } from 'lucide-react';

interface ContratoFormProps {
  contrato?: Contrato;
  onSave: (data: ContratoFormData) => void;
  onCancel: () => void;
}

export const ContratoForm = ({ contrato, onSave, onCancel }: ContratoFormProps) => {
  const { alugueis } = useAlugueis();
  const [formData, setFormData] = useState<ContratoFormData>({
    pedidoId: 0,
    dataInicio: '',
    dataFim: '',
    status: 'ATIVO'
  });
  const [incluirCredito, setIncluirCredito] = useState(false);

  // Filtrar apenas pedidos aprovados que ainda não têm contrato
  const pedidosDisponiveis = alugueis.filter(pedido => 
    pedido.status === 'APROVADO' && !pedido.contratoId
  );



  useEffect(() => {
    if (contrato) {
      setFormData({
        pedidoId: contrato.pedido.id,
        dataInicio: contrato.dataInicio.split('T')[0], // Converter para formato de input date
        dataFim: contrato.dataFim.split('T')[0],
        status: contrato.status,
        bancoConcessorId: contrato.contratoDeCredito?.bancoConcessor.id,
        valorFinanciado: contrato.contratoDeCredito?.valorFinanciado,
        numeroDeParcelas: contrato.contratoDeCredito?.numeroDeParcelas
      });
      setIncluirCredito(!!contrato.contratoDeCredito);
    }
  }, [contrato]);



  const handleInputChange = (field: keyof ContratoFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.pedidoId || !formData.dataInicio || !formData.dataFim) {
      alert('Pedido de Aluguel, Data de Início e Data de Fim são obrigatórios.');
      return;
    }

    if (new Date(formData.dataFim) <= new Date(formData.dataInicio)) {
      alert('A data de fim deve ser posterior à data de início.');
      return;
    }

    if (incluirCredito) {
      if (!formData.bancoConcessorId || !formData.valorFinanciado || !formData.numeroDeParcelas) {
        alert('Para incluir crédito, todos os campos de financiamento são obrigatórios.');
        return;
      }
      if (formData.valorFinanciado <= 0 || formData.numeroDeParcelas <= 0) {
        alert('Valor financiado e número de parcelas devem ser maiores que zero.');
        return;
      }
    }

    const dataToSave = incluirCredito ? formData : {
      pedidoId: formData.pedidoId,
      dataInicio: formData.dataInicio,
      dataFim: formData.dataFim,
      status: formData.status
    };

    onSave(dataToSave);
  };

  const pedidoSelecionado = pedidosDisponiveis.find(p => p.id === formData.pedidoId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">
                {contrato ? 'Editar Contrato' : 'Novo Contrato'}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seleção do Pedido */}
            <div className="space-y-2">
              <Label htmlFor="pedidoId">Pedido de Aluguel *</Label>
              <Select 
                value={formData.pedidoId.toString()} 
                onValueChange={(value) => handleInputChange('pedidoId', parseInt(value))}
                disabled={!!contrato}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um pedido de aluguel aprovado" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {pedidosDisponiveis.length === 0 ? (
                    <div className="p-3 text-sm text-muted-foreground text-center">
                      Nenhum pedido aprovado disponível
                    </div>
                  ) : (
                    pedidosDisponiveis.map((pedido) => (
                      <SelectItem key={pedido.id} value={pedido.id.toString()}>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            #{pedido.id} - {pedido.cliente.nome}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {pedido.automovel.marca} {pedido.automovel.modelo} | {pedido.automovel.placa} | CPF: {pedido.cliente.cpf}
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Informações do Pedido Selecionado */}
            {pedidoSelecionado && (
              <Card className="bg-muted/30">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-3">Detalhes do Pedido Selecionado</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Cliente:</span> {pedidoSelecionado.cliente.nome}
                    </div>
                    <div>
                      <span className="font-medium">CPF:</span> {pedidoSelecionado.cliente.cpf}
                    </div>
                    <div>
                      <span className="font-medium">Veículo:</span> {pedidoSelecionado.automovel.marca} {pedidoSelecionado.automovel.modelo}
                    </div>
                    <div>
                      <span className="font-medium">Placa:</span> {pedidoSelecionado.automovel.placa}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Datas do Contrato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataInicio">Data de Início *</Label>
                <Input
                  id="dataInicio"
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => handleInputChange('dataInicio', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataFim">Data de Fim *</Label>
                <Input
                  id="dataFim"
                  type="date"
                  value={formData.dataFim}
                  onChange={(e) => handleInputChange('dataFim', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Status do Contrato */}
            <div className="space-y-2">
              <Label htmlFor="status">Status do Contrato</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: ContratoStatus) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(contratoStatusLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Checkbox para incluir crédito */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="incluirCredito"
                checked={incluirCredito}
                onCheckedChange={(checked) => setIncluirCredito(checked === true)}
              />
              <Label htmlFor="incluirCredito">Incluir Contrato de Crédito</Label>
            </div>

            {/* Campos de Crédito (condicionais) */}
            {incluirCredito && (
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Dados do Financiamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bancoConcessorId">Banco Concessor *</Label>
                    <Select 
                      value={formData.bancoConcessorId?.toString() || ''} 
                      onValueChange={(value) => handleInputChange('bancoConcessorId', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o banco" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Banco do Brasil</SelectItem>
                        <SelectItem value="2">Caixa Econômica Federal</SelectItem>
                        <SelectItem value="3">Itaú</SelectItem>
                        <SelectItem value="4">Bradesco</SelectItem>
                        <SelectItem value="5">Santander</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="valorFinanciado">Valor Financiado *</Label>
                      <Input
                        id="valorFinanciado"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.valorFinanciado || ''}
                        onChange={(e) => handleInputChange('valorFinanciado', parseFloat(e.target.value))}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numeroDeParcelas">Número de Parcelas *</Label>
                      <Input
                        id="numeroDeParcelas"
                        type="number"
                        min="1"
                        value={formData.numeroDeParcelas || ''}
                        onChange={(e) => handleInputChange('numeroDeParcelas', parseInt(e.target.value))}
                        placeholder="12"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                {contrato ? 'Atualizar Contrato' : 'Criar Contrato'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};