const express = require("express");
const db = require("../db");
const role = require("../middleware/role");
const router = express.Router();

router.get("/users", role("admin"), (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    res.json(result);
  });
});

module.exports = router;
