module.exports = (role) => (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const token = req.headers.authorization;

  const decoded = jwt.verify(token, "clave_secreta");

  if (decoded.role !== role) {
    return res.status(403).json({ msg: "Acceso denegado" });
  }
  next();
};
