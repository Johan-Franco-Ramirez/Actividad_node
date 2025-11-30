import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/books")
      .then(res => setBooks(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Catálogo de Libros</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white p-5 rounded shadow">
            <h2 className="font-bold text-lg mb-2">{book.title}</h2>

            <p className="text-sm mb-4">
              {book.authors?.[0]?.name || "Autor desconocido"}
            </p>

            <Link
              to={`/book/${book.id}`}
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Ver Detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
