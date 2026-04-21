# 💰 InvestLog — Sistema de Controle de Investimentos

Aplicação full stack para gerenciamento de investimentos, permitindo o registro de ativos, controle de compras e vendas e organização dos dados por usuário.

## 🚀 Tecnologias

Frontend: React + TypeScript  
Backend: Node.js + Express  
ORM: Sequelize  
Banco de Dados: MySQL

## ⚙️ Funcionalidades

- Cadastro e autenticação de usuários
- Registro de investimentos
- Controle de compras e vendas
- Relacionamento de dados por usuário

## 🏗️ Arquitetura

Frontend (React) → Backend (API Node.js) → Banco de Dados (MySQL)

## 📁 Estrutura

/frontend  
/backend/src (config, models, routes, controllers)

## 🔌 Como rodar localmente

1. Clone o repositório:
   git clone https://github.com/Marcosvini0001/investlog

2. Crie o banco:
   CREATE DATABASE financeiro;

3. Configure a conexão no backend:
   new Sequelize('financeiro', 'root', 'SUA_SENHA', { host: 'localhost', dialect: 'mysql' });

4. Backend:
   cd backend
   npm install
   npm run dev

5. Frontend:
   cd frontend
   npm install
   npm start

## ⚠️ Observações

- O banco é sincronizado automaticamente com sequelize.sync({ alter: true })
- Para produção, o ideal é usar migrations

## 📚 Aprendizados

Projeto focado em arquitetura full stack, integração entre serviços, modelagem de banco relacional e organização de código em camadas.

## 🚀 Próximos passos

- Dashboard com gráficos
- Melhorias de segurança (JWT)
- Deploy em produção

## 👨‍💻 Autor

Marcos Vinicius Bartoli Senko
LinkedIn: https://www.linkedin.com/in/marcos-vinicius-bartoli-senko-485726297/  
GitHub: https://github.com/Marcosvini0001
