import { useState } from "react";

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
    nome: "",
    tipo: "acao",
    quantidade: 0,
    valor_unitario: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "quantidade" || name === "valor_unitario"
          ? Number(value)
          : value,
    });
  };

  const valorTotal =
    form.tipo === "cdb"
      ? form.valor_unitario
      : form.quantidade * form.valor_unitario;

  return (
    <div className="form">
      <h2>Novo Investimento</h2>

      {/* SELECT */}
      <select name="tipo" value={form.tipo} onChange={handleChange}>
        <option value="acao">Ação</option>
        <option value="fii">FII</option>
        <option value="cripto">Criptomoeda</option>
        <option value="tesouro">Tesouro Direto</option>
        <option value="cdb">CDB</option>
        <option value="outro">Outro</option>
      </select>

      {/* SE FOR CDB → MOSTRA MENOS CAMPOS */}
      {form.tipo === "cdb" && (
        <>
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
          />
          <input
            name="valor_unitario"
            placeholder="Valor total investido"
            type="number"
            value={form.valor_unitario}
            onChange={handleChange}
          />
        </>
      )}

      {/* OUTROS TIPOS */}
      {["acao", "fii", "cripto", "tesouro", "outro"].includes(form.tipo) && (
        <>
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
          />
          <input
            name="quantidade"
            placeholder="Quantidade"
            type="number"
            value={form.quantidade}
            onChange={handleChange}
          />
          <input
            name="valor_unitario"
            placeholder="Valor unitário"
            type="number"
            value={form.valor_unitario}
            onChange={handleChange}
          />
        </>
      )}

      <p>Valor total: R$ {valorTotal.toFixed(2)}</p>

      <button
        className="button"
        onClick={() => {
          if (!form.nome || form.valor_unitario <= 0) {
            alert("Preencha os campos corretamente");
            return;
          }

          if (form.tipo !== "cdb" && form.quantidade <= 0) {
            alert("Quantidade inválida");
            return;
          }

          const dados = { ...form };
          if (form.tipo === "cdb") {
            dados.quantidade = 1;
          }

          onSalvar(dados);
        }}
      >
        Salvar
      </button>
    </div>
  );
}
