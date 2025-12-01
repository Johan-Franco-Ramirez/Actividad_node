export default function Page() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6 text-white">
      <h1 className="text-4xl font-bold">Biblioteca Online</h1>

      <div className="flex gap-4">
        <a className="px-6 py-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition" href="/login">
          Iniciar Sesión
        </a>
        <a className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition" href="/register">
          Registrarme
        </a>
      </div>
    </div>
  );
}
