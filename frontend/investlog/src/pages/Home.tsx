import { useEffect, useState } from 'react';
import api from '../services/api';
import InvestimentoForm from '../componentes/InvestimentoForm';
import { Investimento, InvestimentoInput } from '../types/Investimento';

export default function Home() {
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);

  const carregar = async () => {
    const res = await api.get('/investimentos');
    setInvestimentos(res.data);
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async (dados: InvestimentoInput) => {
    await api.post('/investimentos', dados);
    carregar();
  };

  const totalInvestido = investimentos.reduce((acc, inv) => {
  return acc + inv.valor_total;
  }, 0);

  return (
  <div className="container">
    
    <div className="header">
      <div className="logo">INVESTLOG</div>
      <div className="subtitle">Controle inteligente de investimentos</div>
    </div>

    <div className="card">
      <InvestimentoForm onSalvar={salvar} />
    </div>

    <div className="card">
      <h2>Seus Investimentos</h2>

      <ul className="lista">
        {investimentos.map(inv => (
          <li key={inv.id} className="item">
            <div>
              <strong>{inv.nome}</strong><br />
              {inv.quantidade} cotas
            </div>

            <div className="valor">
              R$ {totalInvestido.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>

  </div>
);
}