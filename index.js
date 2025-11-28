const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const app = express();
const port = 3000;
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'libros_db'
});
db.connect(err => {
  if (err) {
    console.log("Error al conectar con la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos libros_db");
  }
});

app.post('/usuario', (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  const sql = `INSERT INTO usuario (nombre, correo, contraseña) VALUES (?, ?, ?)`;
  db.query(sql, [nombre, correo, contraseña], (err, result) => {
    if (err) {
      console.log("Error al insertar:", err);
      return res.status(500).send("Error al insertar los datos");
    }
    console.log("Usuario agregada correctamente:", result);
    res.status(200).send("Usuario agregada correctamente");
  });
});

  

