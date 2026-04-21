import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import InvestimentoForm from "../componentes/InvestimentoForm";
import { Investimento, InvestimentoInput } from "../types/Investimento";

export default function Home() {
  const navigate = useNavigate();
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [view, setView] = useState<"ultimos" | "geral">("ultimos");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState({
    quantidade: 0,
    valor_unitario: 0,
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const investimentosAgrupados = useMemo(() => {
    const agrupado: Record<
      string,
      { nome: string; tipo: string; quantidade: number; valor_total: number }
    > = {};

    investimentos.forEach((inv) => {
      const key = `${inv.nome.toUpperCase()}|${inv.tipo}`;
      if (!agrupado[key]) {
        agrupado[key] = {
          nome: inv.nome,
          tipo: inv.tipo,
          quantidade: Number(inv.quantidade),
          valor_total: Number(inv.valor_total),
        };
      } else {
        agrupado[key].quantidade += Number(inv.quantidade);
        agrupado[key].valor_total += Number(inv.valor_total);
      }
    });

    return Object.values(agrupado);
  }, [investimentos]);

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

        <div className="view-buttons">
          <button
            className={`view-button ${view === "ultimos" ? "active" : ""}`}
            onClick={() => setView("ultimos")}
          >
            Últimos
          </button>
          <button
            className={`view-button ${view === "geral" ? "active" : ""}`}
            onClick={() => setView("geral")}
          >
            Geral
          </button>
        </div>

        {view === "ultimos" ? (
          <div className="tabela-wrapper">
            <h3>Últimos investimentos</h3>
            <table className="tabela">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                  <th>Valor unitário</th>
                  <th>Valor total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {investimentos
                  .slice()
                  .reverse()
                  .map((inv) => (
                    <tr key={inv.id}>
                      <td>{inv.nome}</td>
                      <td>{inv.tipo.toUpperCase()}</td>
                      <td>{inv.tipo === "cdb" ? "-" : inv.quantidade}</td>
                      <td>R$ {Number(inv.valor_unitario).toFixed(2)}</td>
                      <td>R$ {Number(inv.valor_total).toFixed(2)}</td>
                      <td>
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
                            <button
                              className="cancelar"
                              onClick={cancelarEdicao}
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className="icons">
                            <button
                              className="editar"
                              onClick={() => iniciarEdicao(inv)}
                            >
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
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="tabela-wrapper">
            <h3>Geral - posição consolidada</h3>
            <table className="tabela">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Quantidade total</th>
                  <th>Valor total</th>
                </tr>
              </thead>
              <tbody>
                {investimentosAgrupados.map((inv) => (
                  <tr key={`${inv.nome}-${inv.tipo}`}>
                    <td>{inv.nome}</td>
                    <td>{inv.tipo.toUpperCase()}</td>
                    <td>{inv.tipo === "cdb" ? "-" : inv.quantidade}</td>
                    <td>R$ {inv.valor_total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <button
        type="button"
        className="button logout-button"
        onClick={handleLogout}
      >
        Sair
      </button>
    </div>
  );
}
