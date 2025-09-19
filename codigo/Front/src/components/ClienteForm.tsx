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
    cpf: '',
    email: '',
    telefone: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    cep: '',
    estado: '',
    dataNascimento: '',
    status: 'ativo'
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        nome: cliente.nome,
        cpf: cliente.cpf,
        email: cliente.email,
        telefone: cliente.telefone,
        rua: cliente.endereco.rua,
        numero: cliente.endereco.numero,
        bairro: cliente.endereco.bairro,
        cidade: cliente.endereco.cidade,
        cep: cliente.endereco.cep,
        estado: cliente.endereco.estado,
        dataNascimento: cliente.dataNascimento,
        status: cliente.status
      });
    }
  }, [cliente]);

  const handleInputChange = (field: keyof ClienteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação básica
    if (!formData.nome || !formData.cpf || !formData.email) {
      alert('Nome, CPF e email são obrigatórios.');
      return;
    }
    onSave(formData);
    // Mensagem de sucesso simples
    alert(cliente ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1d4ed8', marginBottom: 16 }}>
        {cliente ? 'Editar Cliente' : 'Novo Cliente'}
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Dados Pessoais */}
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Dados Pessoais</h3>
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
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="email@exemplo.com"
                required
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                value={formData.telefone}
                onChange={e => handleInputChange('telefone', e.target.value)}
                placeholder="(11) 99999-9999"
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input
                id="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={e => handleInputChange('dataNascimento', e.target.value)}
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={formData.status}
                onChange={e => handleInputChange('status', e.target.value)}
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Endereço</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16 }}>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="rua">Rua</label>
              <input
                id="rua"
                value={formData.rua}
                onChange={e => handleInputChange('rua', e.target.value)}
                placeholder="Nome da rua"
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="numero">Número</label>
              <input
                id="numero"
                value={formData.numero}
                onChange={e => handleInputChange('numero', e.target.value)}
                placeholder="123"
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="bairro">Bairro</label>
              <input
                id="bairro"
                value={formData.bairro}
                onChange={e => handleInputChange('bairro', e.target.value)}
                placeholder="Nome do bairro"
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="cidade">Cidade</label>
              <input
                id="cidade"
                value={formData.cidade}
                onChange={e => handleInputChange('cidade', e.target.value)}
                placeholder="Nome da cidade"
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                value={formData.estado}
                onChange={e => handleInputChange('estado', e.target.value)}
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              >
                <option value="">Selecione</option>
                {ESTADOS.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor="cep">CEP</label>
              <input
                id="cep"
                value={formData.cep}
                onChange={e => handleInputChange('cep', e.target.value)}
                placeholder="00000-000"
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