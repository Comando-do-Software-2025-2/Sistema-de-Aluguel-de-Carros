
export interface Cliente {
  id: number;
  nome: string;
  rg: string;
  cpf: string;
  endereco: string;
  profissao?: string;
}


export interface ClienteFormData {
  nome: string;
  rg: string;
  cpf: string;
  endereco: string;
  profissao: string;
}