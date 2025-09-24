export interface Veiculo {
  id: number;
  matricula: string;
  ano: number;
  marca: string;
  modelo: string;
  placa: string;
}

export interface VeiculoFormData {
  matricula: string;
  ano: number;
  marca: string;
  modelo: string;
  placa: string;
}