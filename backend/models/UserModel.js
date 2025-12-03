export const UserModel = {
  create: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
  findByEmail: "SELECT * FROM users WHERE email = ?",
};
