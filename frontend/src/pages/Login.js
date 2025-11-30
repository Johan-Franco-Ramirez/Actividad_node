import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      nav("/books");
    } catch {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-700 to-purple-700">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        <input
          className="w-full p-3 mb-4 border rounded"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 border rounded"
          placeholder="Contraseña"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={submit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded font-bold"
        >
          Entrar
        </button>

        <p className="text-center mt-4 text-sm">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-indigo-600 font-bold">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
