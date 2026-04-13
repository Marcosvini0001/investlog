import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/modelUsers";

const JWT_SECRET = process.env.JWT_SECRET || "segredo";

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, confirmarSenha, telefone } = req.body;

    // validações
    if (!nome || !email || !senha || !confirmarSenha || !telefone) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    if (senha !== confirmarSenha) {
      return res.status(400).json({ message: "As senhas não coincidem" });
    }

    if (senha.length < 6) {
      return res.status(400).json({ message: "Senha deve ter no mínimo 6 caracteres" });
    }

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = await User.create({
      nome,
      email,
      senha: senhaHash,
      telefone,
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user,
    });

  } catch (error) {
    return res.status(500).json({ message: "Erro ao cadastrar", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "Informe email e senha" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login realizado com sucesso",
      token,
      user,
    });

  } catch (error) {
    return res.status(500).json({ message: "Erro no login", error });
  }
};