const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { user_id, plan_id } = req.body;

  db.query(
    "UPDATE users SET plan_id = ? WHERE id = ?",
    [plan_id, user_id],
    () => res.json({ msg: "Plan actualizado" })
  );
});

module.exports = router;
