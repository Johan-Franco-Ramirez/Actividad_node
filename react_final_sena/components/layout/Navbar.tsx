import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-neutral-900 text-white border-b border-neutral-700">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">

        {/* Sección izquierda */}
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="hover:text-gray-300 transition"
          >
            Inicio
          </Link>

          <Link 
            href="/products" 
            className="hover:text-gray-300 transition"
          >
            Productos
          </Link>
        </div>

        {/* Sección derecha totalmente alineada */}
        <div className="ml-auto flex items-center gap-4">
          <Link 
            href="/login" 
            className="px-6 py-2 border border-gray-500 rounded-full hover:bg-gray-800 transition"
          >
            Login
          </Link>

          <Link 
            href="/register" 
            className="px-6 py-2 border border-gray-500 rounded-full hover:bg-gray-800 transition"
          >
            Registro
          </Link>
        </div>

      </div>
    </nav>
  );
}
