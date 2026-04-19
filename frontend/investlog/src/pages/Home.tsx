import { useEffect, useState } from "react";
import api from "../services/api";
import InvestimentoForm from "../componentes/InvestimentoForm";
import { Investimento, InvestimentoInput } from "../types/Investimento";

export default function Home() {
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState({
    quantidade: 0,
    valor_unitario: 0,
  });

  const carregar = async () => {
    const res = await api.get("/investimentos");
    setInvestimentos(res.data);
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async (dados: InvestimentoInput) => {
    try {
      await api.post("/investimentos", dados);
      carregar();
    } catch (error: any) {
      console.error(
        "Erro ao salvar investimento:",
        error.response?.data || error.message,
      );
      alert(error.response?.data?.message || "Erro ao salvar investimento");
    }
  };

  const iniciarEdicao = (inv: Investimento) => {
    setEditingId(inv.id);
    setEditingData({
      quantidade: Number(inv.quantidade),
      valor_unitario: Number(inv.valor_unitario),
    });
  };

  const cancelarEdicao = () => {
    setEditingId(null);
  };

  const salvarEdicao = async (id: number) => {
    try {
      if (editingData.quantidade <= 0 || editingData.valor_unitario <= 0) {
        alert("Quantidade e valor unitário devem ser maiores que zero");
        return;
      }

      await api.patch(`/investimentos/${id}`, {
        quantidade: editingData.quantidade,
        valor_unitario: editingData.valor_unitario,
      });

      setEditingId(null);
      carregar();
    } catch (error: any) {
      console.error(
        "Erro ao atualizar investimento:",
        error.response?.data || error.message,
      );
      alert(error.response?.data?.message || "Erro ao atualizar investimento");
    }
  };

  const excluirInvestimento = async (id: number) => {
    try {
      if (!window.confirm("Deseja realmente excluir este investimento?")) {
        return;
      }

      await api.delete(`/investimentos/${id}`);
      carregar();
    } catch (error: any) {
      console.error(
        "Erro ao excluir investimento:",
        error.response?.data || error.message,
      );
      alert(error.response?.data?.message || "Erro ao excluir investimento");
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
          <span>INVEST</span>
          <span>LOG</span>
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
          {investimentos.map((inv) => (
            <li key={inv.id} className="item">
              <div>
                <strong>{inv.nome}</strong>
                <br />
                <span>{inv.quantidade} cotas</span>
              </div>

              <div className="valor">
                R$ {Number(inv.valor_total).toFixed(2)}
              </div>

              {editingId === inv.id ? (
                <div className="editar-bloco">
                  <input
                    type="number"
                    value={editingData.quantidade}
                    min={0}
                    onChange={(e) =>
                      setEditingData({
                        ...editingData,
                        quantidade: Number(e.target.value),
                      })
                    }
                  />
                  <input
                    type="number"
                    value={editingData.valor_unitario}
                    min={0}
                    step={0.01}
                    onChange={(e) =>
                      setEditingData({
                        ...editingData,
                        valor_unitario: Number(e.target.value),
                      })
                    }
                  />
                  <button
                    className="salvar"
                    onClick={() => salvarEdicao(inv.id)}
                  >
                    Salvar
                  </button>
                  <button className="cancelar" onClick={cancelarEdicao}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="icons">
                  <button className="editar" onClick={() => iniciarEdicao(inv)}>
                    Editar
                  </button>
                  <button
                    className="excluir"
                    onClick={() => excluirInvestimento(inv.id)}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
