import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secretito";

export const register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Campos faltantes" });

  db.query("SELECT id FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Error DB" });
    if (results.length) return res.status(400).json({ error: "Email ya registrado" });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: "Error encriptar" });
      db.query("INSERT INTO users (name,email,password) VALUES (?,?,?)", [name, email, hash], (err) => {
        if (err) return res.status(500).json({ error: "No se pudo registrar" });
        res.json({ message: "Usuario registrado" });
      });
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Campos faltantes" });

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Error DB" });
    if (results.length === 0) return res.status(400).json({ error: "Usuario no encontrado" });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, same) => {
      if (!same) return res.status(400).json({ error: "Contraseña incorrecta" });

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "8h" });
      res.json({ message: "Login ok", token });
    });
  });
};

export const getUser = (req, res) => {
  const id = req.userId;
  db.query("SELECT id, name, email FROM users WHERE id = ?", [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(results[0]);
  });
};
