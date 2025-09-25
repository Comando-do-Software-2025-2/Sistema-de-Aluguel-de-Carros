import { useState } from 'react';
import { Veiculo } from '@/types/veiculo';

interface VeiculoListProps {
  veiculos: Veiculo[];
  onEdit: (veiculo: Veiculo) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export const VeiculoList = ({ veiculos, onEdit, onDelete, onAdd }: VeiculoListProps) => {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredVeiculos = veiculos.filter(veiculo =>
    veiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veiculo.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veiculo.ano.toString().includes(searchTerm)
  );

  // Para confirmação de exclusão
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: '#059669', display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Ícone de carro */}
            <span style={{ display: 'inline-block', background: '#d1fae5', borderRadius: '50%', width: 32, height: 32, textAlign: 'center', lineHeight: '32px', fontWeight: 700, color: '#10b981' }}>◐</span>
            Gerenciar Veículos
          </h2>
          <button onClick={onAdd} style={{ padding: '8px 16px', borderRadius: 4, background: '#059669', color: '#fff', border: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 18 }}>+</span> Novo Veículo
          </button>
        </div>
        <div style={{ marginTop: 16, position: 'relative' }}>
          <input
            placeholder="Pesquisar por marca, modelo, placa ou matrícula..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: 4, border: '1px solid #ccc' }}
          />
          <span style={{ position: 'absolute', left: 10, top: 28, transform: 'translateY(-50%)', color: '#059669', fontSize: '16px' }}>⌕</span>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredVeiculos.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 48, color: '#10b981', marginBottom: 12 }}>◐</div>
            <p style={{ fontSize: 18, fontWeight: 500, color: '#64748b' }}>
              {searchTerm ? 'Nenhum veículo encontrado' : 'Nenhum veículo cadastrado'}
            </p>
            <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 16 }}>
              {searchTerm ? 'Tente ajustar os termos de busca' : 'Comece cadastrando seu primeiro veículo'}
            </p>
            {!searchTerm && (
              <button onClick={onAdd} style={{ padding: '8px 16px', borderRadius: 4, background: '#059669', color: '#fff', border: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto' }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>+</span> Cadastrar Primeiro Veículo
              </button>
            )}
          </div>
        ) : (
          filteredVeiculos.map((veiculo) => (
            <div key={veiculo.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#222' }}>{veiculo.marca} {veiculo.modelo}</h3>
                    <span style={{ fontSize: 14, color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: 12 }}>{veiculo.ano}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 14, color: '#64748b', marginTop: 8 }}>
                    <div><span style={{ fontWeight: 500 }}>Matrícula:</span> {veiculo.matricula}</div>
                    <div><span style={{ fontWeight: 500 }}>Placa:</span> {veiculo.placa}</div>
                    <div><span style={{ fontWeight: 500 }}>Marca:</span> {veiculo.marca}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                  <button
                    onClick={() => onEdit(veiculo)}
                    style={{ padding: '8px 12px', borderRadius: 4, background: '#fff', color: '#059669', border: '1px solid #059669', fontWeight: 500 }}
                  >
                    ✎ Editar
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(veiculo.id)}
                    style={{ padding: '8px 12px', borderRadius: 4, background: '#fff', color: '#dc2626', border: '1px solid #dc2626', fontWeight: 500 }}
                  >
                    ✕ Excluir
                  </button>
                </div>
              </div>
              {/* Modal de confirmação simples */}
              {confirmDeleteId === veiculo.id && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: 16, marginTop: 8 }}>
                  <div style={{ fontWeight: 600, color: '#dc2626', marginBottom: 8 }}>Confirmar Exclusão</div>
                  <div style={{ color: '#991b1b', marginBottom: 12 }}>
                    Tem certeza que deseja excluir o veículo <strong>{veiculo.marca} {veiculo.modelo}</strong>? Esta ação não pode ser desfeita.
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setConfirmDeleteId(null)} style={{ padding: '6px 16px', borderRadius: 4, background: '#fff', color: '#059669', border: '1px solid #059669', fontWeight: 500 }}>Cancelar</button>
                    <button onClick={() => { onDelete(veiculo.id); setConfirmDeleteId(null); }} style={{ padding: '6px 16px', borderRadius: 4, background: '#dc2626', color: '#fff', border: 'none', fontWeight: 500 }}>Excluir</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {filteredVeiculos.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 12, textAlign: 'center', fontSize: 14, color: '#64748b' }}>
          Mostrando {filteredVeiculos.length} de {veiculos.length} veículos
        </div>
      )}
    </div>
  );
};