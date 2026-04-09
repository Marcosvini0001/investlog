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

  const valorTotal = form.quantidade * form.valor_unitario;

  return (
  <div className="form">
    <h2>Novo Investimento</h2>

    <input name="nome" placeholder="Nome" onChange={handleChange} />
    <input name="quantidade" placeholder="Quantidade" type='number' onChange={handleChange} />
    <input name="valor_unitario" placeholder="Valor unitário" type='number' onChange={handleChange} />
    <p>Valor total: R$ {valorTotal.toFixed(2)}</p>

    <button
        className="button"
        onClick={() => {
          if (!form.nome || form.quantidade <= 0 || form.valor_unitario <= 0) {
            alert('Preencha todos os campos corretamente');
            return;
          }

          onSalvar(form);
        }}
      >
        Salvar
     </button>
  </div>
);
}