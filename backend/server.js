require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/plans", require("./routes/plans"));


app.listen(4000, () => {
  console.log("Servidor corriendo en puerto 4000");
});
