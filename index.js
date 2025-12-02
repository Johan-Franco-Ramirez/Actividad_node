const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.post('/registro', (req, res) => {
  console.log(req.body);
  const { nombre, correo, contraseña } = req.body;
  const sql = `INSERT INTO usuario (nombre, correo, contraseña) VALUES (?, ?, ?)`;
  db.query(sql, [nombre, correo, contraseña], (err, result) => {
    if (confirmarcontraseña != contraseña){
      return('la contraseña no coincide con la confirmacion')
    }
    if (err) {
      console.log("Error al insertar:", err);
      return res.status(500).send("Error al insertar los datos");
    }
    console.log("Usuario agregado correctamente:", result);
    res.status(200).send("Usuario agregado correctamente");
  });
});

app.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;
  const sql = "SELECT * FROM usuario WHERE correo = ?";
  db.query(sql, [correo], (err, results) => {
    if (err) {
      console.log("Error al buscar usuario:", err);
      return res.status(500).send("Error interno");
    }
    if (results.length === 0) {
      return res.status(400).send("El correo no está registrado");
    }
    const usuario = results[0];
    if (usuario.contrasena !== contrasena) {
      return res.status(401).send("Contraseña incorrecta");
    }
    res.send("Inicio de sesión exitoso. ¡Bienvenido " + usuario.nombre + "!"); //mientras hago el inicio es para ver la funcionalidad
  });
});



app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
