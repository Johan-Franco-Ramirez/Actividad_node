"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    if (!email || !pass) {
      setMessage("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();
      setMessage(data.message);

      // Aquí puedes agregar redirección si el login es exitoso
      // if (data.success) router.push("/dashboard");

    } catch (error) {
      setMessage("Error al conectar con el servidor.");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-neutral-900/70 backdrop-blur-md p-8 rounded-2xl border border-neutral-800 shadow-lg"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center">Iniciar Sesión</h1>

        <div className="space-y-4">

          {/* CORREO */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-neutral-300">Correo electrónico</label>
            <input
              type="email"
              placeholder="ejemplo@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-neutral-800 rounded-xl border border-neutral-700 
                         focus:border-white transition outline-none text-sm"
            />
          </div>

          {/* CONTRASEÑA */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-neutral-300">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-3 bg-neutral-800 rounded-xl border border-neutral-700 
                         focus:border-white transition outline-none text-sm"
            />
          </div>

        </div>

        {message && (
          <p className="text-sm text-red-400 mt-3 text-center">{message}</p>
        )}

        <button
          className="mt-6 w-full py-3 rounded-xl bg-white text-black font-medium 
                     hover:bg-neutral-300 transition"
        >
          Entrar
        </button>

      </form>
    </div>
  );
}
