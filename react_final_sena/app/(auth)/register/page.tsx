"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: any) {
    e.preventDefault();

    if (!name || !email || !pass) {
      setMessage("Todos los campos son obligatorios.");
      return;
    }

    if (pass !== confirmPass) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("http://localhost/backend/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass }),
      });

      const data = await res.json();
      setMessage(data.message);

      // ✅ Si el registro es correcto, guardar token y usuario
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ⏳ Pequeño tiempo para que el usuario vea el mensaje
        setTimeout(() => {
          router.push("/products"); // Redirección
        }, 800);
      }

    } catch (err) {
      setMessage("Error al conectar con el servidor.");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 text-white">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-neutral-900/70 backdrop-blur-md p-8 
                   rounded-2xl border border-neutral-800 shadow-lg"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Crear Cuenta
        </h1>

        <div className="space-y-4">

          {/* NOMBRE */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-neutral-300">Nombre completo</label>
            <input
              className="w-full p-3 bg-neutral-800 rounded-xl border border-neutral-700 
                         focus:border-white transition outline-none text-sm"
              placeholder="Tu nombre"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* CORREO */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-neutral-300">Correo electrónico</label>
            <input
              type="email"
              className="w-full p-3 bg-neutral-800 rounded-xl border border-neutral-700 
                         focus:border-white transition outline-none text-sm"
              placeholder="ejemplo@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* CONTRASEÑA */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-neutral-300">Contraseña</label>
            <input
              type="password"
              className="w-full p-3 bg-neutral-800 rounded-xl border border-neutral-700 
                         focus:border-white transition outline-none text-sm"
              placeholder="********"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          {/* CONFIRMAR */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-neutral-300">Confirmar contraseña</label>
            <input
              type="password"
              className="w-full p-3 bg-neutral-800 rounded-xl border border-neutral-700 
                         focus:border-white transition outline-none text-sm"
              placeholder="********"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>

        </div>

        {message && (
          <p className="text-sm text-center mt-3 text-red-400">{message}</p>
        )}

        <button
          className="mt-6 w-full py-3 rounded-xl bg-white text-black font-medium 
                     hover:bg-neutral-300 transition"
        >
          Registrarme
        </button>
      </form>
    </div>
  );
}
