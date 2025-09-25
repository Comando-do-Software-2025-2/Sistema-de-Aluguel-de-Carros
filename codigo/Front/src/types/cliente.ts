
export interface Cliente {
  id: number;
  nome: string;
  email: string;
  senha: string;
  rg: string;
  cpf: string;
  endereco: string;
  profissao?: string;
}


export interface ClienteFormData {
  nome: string;
  email: string;
  senha: string;
  rg: string;
  cpf: string;
  endereco: string;
  profissao: string;
}