import { useState } from 'react';
import { Cliente } from '@/types/cliente';

interface ClienteListProps {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export const ClienteList = ({ clientes, onEdit, onDelete, onAdd }: ClienteListProps) => {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpf.includes(searchTerm) ||
    cliente.rg.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cliente.profissao && cliente.profissao.toLowerCase().includes(searchTerm.toLowerCase())) ||
    cliente.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  // Para confirmação de exclusão
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: '#059669', display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Ícone de usuário */}
            <span style={{ display: 'inline-block', background: '#d1fae5', borderRadius: '50%', width: 32, height: 32, textAlign: 'center', lineHeight: '32px', fontWeight: 700, color: '#10b981' }}>U</span>
            Gerenciar Clientes
          </h2>
          <button onClick={onAdd} style={{ padding: '8px 16px', borderRadius: 4, background: '#059669', color: '#fff', border: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 18 }}>+</span> Novo Cliente
          </button>
        </div>
        <div style={{ marginTop: 16, position: 'relative' }}>
          <input
            placeholder="Pesquisar por nome, CPF ou email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: 4, border: '1px solid #ccc' }}
          />
          <span style={{ position: 'absolute', left: 10, top: 28, transform: 'translateY(-50%)', color: '#059669', fontSize: '16px' }}>⌕</span>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredClientes.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 48, color: '#10b981', marginBottom: 12 }}>◉</div>
            <p style={{ fontSize: 18, fontWeight: 500, color: '#64748b' }}>
              {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
            </p>
            <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 16 }}>
              {searchTerm ? 'Tente ajustar os termos de busca' : 'Comece cadastrando seu primeiro cliente'}
            </p>
            {!searchTerm && (
              <button onClick={onAdd} style={{ padding: '8px 16px', borderRadius: 4, background: '#059669', color: '#fff', border: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>+</span> Cadastrar Primeiro Cliente
              </button>
            )}
          </div>
        ) : (
          filteredClientes.map((cliente) => (
            <div key={cliente.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#222' }}>{cliente.nome}</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 14, color: '#64748b', marginTop: 8 }}>
                    <div><span style={{ fontWeight: 500 }}>CPF:</span> {formatCPF(cliente.cpf)}</div>
                    <div><span style={{ fontWeight: 500 }}>RG:</span> {cliente.rg}</div>
                    <div><span style={{ fontWeight: 500 }}>Email:</span> {cliente.email}</div>
                    <div><span style={{ fontWeight: 500 }}>Profissão:</span> {cliente.profissao || 'Não informado'}</div>
                    <div style={{ gridColumn: 'span 3' }}><span style={{ fontWeight: 500 }}>Endereço:</span> {cliente.endereco}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                  <button
                    onClick={() => onEdit(cliente)}
                    style={{ padding: '8px 12px', borderRadius: 4, background: '#fff', color: '#059669', border: '1px solid #059669', fontWeight: 500 }}
                  >
                    ✎ Editar
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(cliente.id)}
                    style={{ padding: '8px 12px', borderRadius: 4, background: '#fff', color: '#dc2626', border: '1px solid #dc2626', fontWeight: 500 }}
                  >
                    ✕ Excluir
                  </button>
                </div>
              </div>
              {/* Modal de confirmação simples */}
              {confirmDeleteId === cliente.id && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: 16, marginTop: 8 }}>
                  <div style={{ fontWeight: 600, color: '#dc2626', marginBottom: 8 }}>Confirmar Exclusão</div>
                  <div style={{ color: '#991b1b', marginBottom: 12 }}>
                    Tem certeza que deseja excluir o cliente <strong>{cliente.nome}</strong>? Esta ação não pode ser desfeita.
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setConfirmDeleteId(null)} style={{ padding: '6px 16px', borderRadius: 4, background: '#fff', color: '#059669', border: '1px solid #059669', fontWeight: 500 }}>Cancelar</button>
                    <button onClick={() => { onDelete(cliente.id); setConfirmDeleteId(null); }} style={{ padding: '6px 16px', borderRadius: 4, background: '#dc2626', color: '#fff', border: 'none', fontWeight: 500 }}>Excluir</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {filteredClientes.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 12, textAlign: 'center', fontSize: 14, color: '#64748b' }}>
          Mostrando {filteredClientes.length} de {clientes.length} clientes
        </div>
      )}
    </div>
  );
};