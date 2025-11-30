router.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "clave_secreta");

  const response = await axios.get("https://gutendex.com/books");

  if (decoded.plan === 1) {
    return res.json(response.data.results.slice(0, 5));
  }

  res.json(response.data.results);
});
