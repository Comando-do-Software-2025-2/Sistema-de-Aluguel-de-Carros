import { useState, useEffect } from 'react';
import { Cliente, ClienteFormData } from '@/types/cliente';

interface ClienteFormProps {
  cliente?: Cliente;
  onSave: (data: ClienteFormData) => void;
  onCancel: () => void;
}

const ESTADOS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];


export const ClienteForm = ({ cliente, onSave, onCancel }: ClienteFormProps) => {
  const [formData, setFormData] = useState<ClienteFormData>({
    nome: '',
    rg: '',
    cpf: '',
    endereco: '',
    profissao: ''
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        nome: cliente.nome,
        rg: cliente.rg,
        cpf: cliente.cpf,
        endereco: cliente.endereco,
        profissao: cliente.profissao || ''
      });
    }
  }, [cliente]);

  const handleInputChange = (field: keyof ClienteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação básica
    if (!formData.nome || !formData.cpf || !formData.rg || !formData.endereco) {
      alert('Nome, RG, CPF e Endereço são obrigatórios.');
      return;
    }
    onSave(formData);
    alert(cliente ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1d4ed8', marginBottom: 16 }}>
        {cliente ? 'Editar Cliente' : 'Novo Cliente'}
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Dados do Cliente</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="nome">Nome Completo *</label>
              <input
                id="nome"
                value={formData.nome}
                onChange={e => handleInputChange('nome', e.target.value)}
                placeholder="Digite o nome completo"
                required
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="rg">RG *</label>
              <input
                id="rg"
                value={formData.rg}
                onChange={e => handleInputChange('rg', e.target.value)}
                placeholder="00.000.000-0"
                required
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="cpf">CPF *</label>
              <input
                id="cpf"
                value={formData.cpf}
                onChange={e => handleInputChange('cpf', e.target.value)}
                placeholder="000.000.000-00"
                required
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="endereco">Endereço *</label>
              <input
                id="endereco"
                value={formData.endereco}
                onChange={e => handleInputChange('endereco', e.target.value)}
                placeholder="Rua, número, bairro, cidade, estado, CEP"
                required
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="profissao">Profissão</label>
              <input
                id="profissao"
                value={formData.profissao}
                onChange={e => handleInputChange('profissao', e.target.value)}
                placeholder="Profissão do cliente"
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div style={{ display: 'flex', gap: 16, paddingTop: 16 }}>
          <button type="submit" style={{ flex: 1, padding: 12, borderRadius: 4, background: '#1d4ed8', color: '#fff', border: 'none', fontWeight: 500 }}>
            {cliente ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
          </button>
          <button type="button" onClick={onCancel} style={{ flex: 1, padding: 12, borderRadius: 4, background: '#fff', color: '#1d4ed8', border: '1px solid #1d4ed8', fontWeight: 500 }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};