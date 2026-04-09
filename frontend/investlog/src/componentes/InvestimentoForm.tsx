import { useState } from 'react';

type InvestimentoInput = {
  nome: string;
  tipo: string;
  quantidade: number;
  valor_unitario: number;
};

type Props = {
  onSalvar: (dados: InvestimentoInput) => void;
};

export default function InvestimentoForm({ onSalvar }: Props) {
  const [form, setForm] = useState<InvestimentoInput>({
    nome: '',
    tipo: 'acao',
    quantidade: 0,
    valor_unitario: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === 'quantidade' || name === 'valor_unitario'
          ? Number(value)
          : value
    });
  };

  return (
  <div className="form">
    <h2>Novo Investimento</h2>

    <input name="nome" placeholder="Nome" onChange={handleChange} />
    <input name="quantidade" placeholder="Quantidade" onChange={handleChange} />
    <input name="valor_unitario" placeholder="Valor unitário" onChange={handleChange} />

    <button className="button" onClick={() => onSalvar(form)}>
      Salvar
    </button>
  </div>
);
}