"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) router.push("/dashboard");
    else setError("Credenciales incorrectas");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>

      <input type="email" placeholder="Correo"
        onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Entrar</button>

      {error && <p>{error}</p>}
    </form>
  );
}
