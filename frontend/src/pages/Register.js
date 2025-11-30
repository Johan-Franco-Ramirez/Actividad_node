import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async () => {
    await axios.post("http://localhost:4000/api/auth/register", form);
    alert("Usuario registrado correctamente");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

        <input
          className="w-full p-3 mb-3 border rounded"
          placeholder="Nombre"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-3 mb-3 border rounded"
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
          className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700"
        >
          Crear Cuenta
        </button>
      </div>
    </div>
  );
}
