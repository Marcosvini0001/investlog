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
    try {
      await api.post('/investimentos', dados);
      carregar();
    } catch (error: any) {
      console.error("Erro ao salvar investimento:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Erro ao salvar investimento");
    }
  };

  const totalInvestido = investimentos.reduce((acc, inv) => {
    const valor = Number(inv.valor_total);
    return acc + (isNaN(valor) ? 0 : valor);
  }, 0);

  return (
  <div className="container">
    
    <div className="header">
      <div className="logo">
          <span>INVEST</span><span>LOG</span>
        </div>
      <div className="subtitle">Controle inteligente de investimentos</div>
    </div>

    <div className="card">
      <InvestimentoForm onSalvar={salvar} />
    </div>

    <div className="card">
  <h2>Seus Investimentos</h2>

  <div className="resumo">
    <div>Total investido</div>
    <strong>R$ {totalInvestido.toFixed(2)}</strong>
  </div>

  <ul className="lista">
    {investimentos.map(inv => (
      <li key={inv.id} className="item">
        <div>
          <strong>{inv.nome}</strong><br />
          <span>{inv.quantidade} cotas</span>
        </div>

        <div className="valor">
          R$ {Number(inv.valor_total).toFixed(2)}
        </div>
      </li>
    ))}
  </ul>
</div>

  </div>
);
}