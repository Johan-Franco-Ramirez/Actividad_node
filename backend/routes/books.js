const express = require("express");
const axios = require("axios");
const router = express.Router();

// LISTAR LIBROS
router.get("/", async (req, res) => {
  const response = await axios.get("https://gutendex.com/books");
  res.json(response.data.results);
});

// DETALLE DE LIBRO POR ID
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(`https://gutendex.com/books/${req.params.id}`);
    res.json(response.data);
  } catch {
    res.json({ msg: "No se encontró información del libro" });
  }
});

module.exports = router;
