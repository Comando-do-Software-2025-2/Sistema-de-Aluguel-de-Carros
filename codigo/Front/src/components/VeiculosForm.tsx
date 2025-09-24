import { useState, useEffect } from 'react';
import { Veiculo, VeiculoFormData } from '@/types/veiculo';

interface VeiculoFormProps {
  veiculo?: Veiculo;
  onSave: (data: VeiculoFormData) => void;
  onCancel: () => void;
}

export const VeiculoForm = ({ veiculo, onSave, onCancel }: VeiculoFormProps) => {
  const [formData, setFormData] = useState<VeiculoFormData>({
    matricula: '',
    ano: new Date().getFullYear(),
    marca: '',
    modelo: '',
    placa: ''
  });

  useEffect(() => {
    if (veiculo) {
      setFormData({
        matricula: veiculo.matricula,
        ano: veiculo.ano,
        marca: veiculo.marca,
        modelo: veiculo.modelo,
        placa: veiculo.placa
      });
    }
  }, [veiculo]);

  const handleInputChange = (field: keyof VeiculoFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação básica
    if (!formData.matricula || !formData.marca || !formData.modelo || !formData.placa) {
      alert('Matrícula, Marca, Modelo e Placa são obrigatórios.');
      return;
    }
    if (formData.ano < 1900 || formData.ano > new Date().getFullYear()) {
      alert('Ano deve ser válido.');
      return;
    }
    onSave(formData);
    alert(veiculo ? 'Veículo atualizado com sucesso!' : 'Veículo cadastrado com sucesso!');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1d4ed8', marginBottom: 16 }}>
        {veiculo ? 'Editar Veículo' : 'Novo Veículo'}
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Dados do Veículo</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="matricula">Matrícula *</label>
              <input
                id="matricula"
                value={formData.matricula}
                onChange={e => handleInputChange('matricula', e.target.value)}
                placeholder="Digite a matrícula do veículo"
                required
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="ano">Ano *</label>
              <input
                id="ano"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.ano}
                onChange={e => handleInputChange('ano', parseInt(e.target.value) || new Date().getFullYear())}
                placeholder="2024"
                required
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="marca">Marca *</label>
              <input
                id="marca"
                value={formData.marca}
                onChange={e => handleInputChange('marca', e.target.value)}
                placeholder="Ex: Toyota, Honda, Ford"
                required
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="modelo">Modelo *</label>
              <input
                id="modelo"
                value={formData.modelo}
                onChange={e => handleInputChange('modelo', e.target.value)}
                placeholder="Ex: Corolla, Civic, Focus"
                required
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="placa">Placa *</label>
              <input
                id="placa"
                value={formData.placa}
                onChange={e => handleInputChange('placa', e.target.value)}
                placeholder="ABC-1234"
                required
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div style={{ display: 'flex', gap: 16, paddingTop: 16 }}>
          <button type="submit" style={{ flex: 1, padding: 12, borderRadius: 4, background: '#1d4ed8', color: '#fff', border: 'none', fontWeight: 500 }}>
            {veiculo ? 'Atualizar Veículo' : 'Cadastrar Veículo'}
          </button>
          <button type="button" onClick={onCancel} style={{ flex: 1, padding: 12, borderRadius: 4, background: '#fff', color: '#1d4ed8', border: '1px solid #1d4ed8', fontWeight: 500 }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};