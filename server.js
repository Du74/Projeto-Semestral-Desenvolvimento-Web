const express = require("express");
const cors = require("cors");
const db = require("./db"); // importa a conexão
const app = express();
const PORT = 3000;
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(express.json());

app.get("/materiais", (req, res) => {
  db.query("SELECT * FROM materiais", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/materiais", (req, res) => {
  const { nome, quantidade } = req.body;
  db.query("INSERT INTO materiais (nome, quantidade) VALUES (?, ?)", [nome, quantidade], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ id: results.insertId, nome, quantidade });
  });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
// Simulação simples de usuário fixo

  app.post("/register", async (req, res) => {
    const { email, senha } = req.body;
  
    if (!email || !senha) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }
  
    // Verificar se usuário já existe
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length > 0) {
        return res.status(409).json({ message: "Email já cadastrado" });
      }
  
      // Hash da senha
      const hashSenha = await bcrypt.hash(senha, 10);
  
      // Inserir novo usuário
      db.query("INSERT INTO usuarios (email, senha) VALUES (?, ?)", [email, hashSenha], (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Usuário registrado com sucesso" });
      });
    });
  });
  app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) {
      return res.status(401).json({ message: "Usuário ou senha inválidos" });
    }

    const user = results[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Usuário ou senha inválidos" });
    }

    res.status(200).json({ message: "Login realizado com sucesso" });
  });
});
    