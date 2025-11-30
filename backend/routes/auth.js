const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

const SECRET = "clave_secreta";

// REGISTRO
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hash],
    (err) => {
      if (err) return res.status(400).json({ msg: "Usuario ya existe" });
      res.json({ msg: "Usuario registrado correctamente" });
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ msg: "Error en el servidor" });
    if (result.length === 0) return res.status(401).json({ msg: "Usuario no encontrado" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, role: user.role, plan: user.plan_id },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: user.name,
      role: user.role,
      plan: user.plan_id
    });
  });
});

// VERIFICAR TOKEN
router.get("/verify", (req, res) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, SECRET);
    res.json({ valid: true });
  } catch {
    res.json({ valid: false });
  }
});

module.exports = router;
