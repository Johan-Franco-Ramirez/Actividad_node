"use client";
import { useEffect, useState } from "react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch("https://gutendex.com/books/");
        const data = await res.json();
        setBooks(data.results);
      } catch (err) {
        console.error("Error cargando libros:", err);
      }
    }
    loadBooks();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Libros disponibles</h1>

      {/* GRID MINIMALISTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book: any) => (
          <a
            key={book.id}
            href={`/books/${book.id}`}
            className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 hover:border-white transition-all cursor-pointer"
          >
            <h2 className="text-lg font-medium">{book.title}</h2>
            <p className="text-sm text-neutral-400 mt-2">
              {book.authors?.[0]?.name ?? "Autor desconocido"}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
