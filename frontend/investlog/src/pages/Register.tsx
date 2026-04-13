import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      return alert("Senhas não coincidem");
    }

    try {
      await axios.post("http://localhost:3000/auth/register", {
        nome,
        email,
        senha,
        confirmarSenha,
        telefone,
      });

      alert("Cadastro realizado com sucesso!");

      navigate("/"); 

    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao cadastrar");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cadastro</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <br /><br />

        <button type="submit">Cadastrar</button>
      </form>

      <p>
        Já tem conta? <Link to="/">Login</Link>
      </p>
    </div>
  );
}