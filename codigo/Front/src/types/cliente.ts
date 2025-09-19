export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    estado: string;
  };
  dataNascimento: string;
  status: 'ativo' | 'inativo';
  dataRegistro: string;
}

export interface ClienteFormData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
  estado: string;
  dataNascimento: string;
  status: 'ativo' | 'inativo';
}