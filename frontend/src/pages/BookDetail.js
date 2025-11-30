import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/books/${id}`)
      .then(res => {
        if (res.data.msg) setBook(null);
        else setBook(res.data);
      });
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">
          No se encontró información del libro
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">{book.title}</h1>

        <p className="mb-2">
          <strong>Autor:</strong>{" "}
          {book.authors?.[0]?.name || "Desconocido"}
        </p>

        <p className="mb-2">
          <strong>Idioma:</strong> {book.languages?.[0]}
        </p>

        <p className="mb-4">
          <strong>Descargas:</strong> {book.download_count}
        </p>

        <a
          href="/books"
          className="inline-block bg-gray-800 text-white px-4 py-2 rounded"
        >
          Volver
        </a>
      </div>
    </div>
  );
}
