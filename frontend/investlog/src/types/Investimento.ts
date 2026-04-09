export type Investimento = {
  id: number;
  nome: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
};

export type InvestimentoInput = {
  nome: string;
  tipo: string;
  quantidade: number;
  valor_unitario: number;
};