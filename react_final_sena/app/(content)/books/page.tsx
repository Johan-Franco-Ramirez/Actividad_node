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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10 py-10">
  {books.map((book) => (
    <div key={book.id} className="flex flex-col">
      <img
        src={book.formats["image/jpeg"]}
        alt={book.title}
        className="w-full h-64 object-cover rounded-xl shadow-md"
      />

      <h2 className="text-white mt-3 text-lg font-semibold">
        {book.title}
      </h2>

      <p className="text-gray-300 text-sm">
        {book.authors.map((a) => a.name).join(", ")}
      </p>
    </div>
  ))}
</div>

  );
}
