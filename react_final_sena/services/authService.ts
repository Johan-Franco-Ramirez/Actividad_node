export async function loginUser(email: string, password: string) {
  const res = await fetch("http://localhost/backend/login.php", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return await res.json();
}
