import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        email,
        senha,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login realizado com sucesso!");
      navigate("/home");
    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <span>INVEST</span>
          <span>LOG</span>
        </div>
        <div className="subtitle">
          Controle seus investimentos com segurança
        </div>
      </div>

      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit" className="button">
            Entrar
          </button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Não tem conta? <Link to="/register">Cadastrar</Link>
        </p>
      </div>
    </div>
  );
}
