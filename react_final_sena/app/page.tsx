export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center bg-neutral-900 text-white px-4">
      <div className="bg-neutral-800 p-10 rounded-xl shadow-xl max-w-md text-center">
        <h1 className="text-3xl font-semibold mb-3">Bienvenido a la Biblioteca Digital</h1>
        <p className="text-gray-400 mb-6">Consulta libros, crea una cuenta o inicia sesión.</p>

        <a href="/products" className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">
          Ver Libros
        </a>
      </div>
    </div>
  );
}
