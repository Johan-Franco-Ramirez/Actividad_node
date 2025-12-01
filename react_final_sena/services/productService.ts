import { Product } from "../types/product";

// Función auxiliar para obtener el nombre del autor
function getAuthorName(book: any): string {
  return Array.isArray(book.authors) && book.authors.length > 0
    ? book.authors[0]?.name || "Autor desconocido"
    : "Autor desconocido";
}

// Función auxiliar para obtener la imagen del libro
function getImageUrl(book: any): string {
  return book.formats?.["image/jpeg"] || "";
}

export async function listProducts(): Promise<Product[]> {
  const res = await fetch("https://gutendex.com/books");
  const data = await res.json();

  return data.results.map((book: any) => ({
    id: String(book.id),
    name: book.title,
    description: getAuthorName(book),
    price: 0,
    imageUrl: getImageUrl(book),
  }));
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const res = await fetch(`https://gutendex.com/books/${id}`);
  const book = await res.json();

  return {
    id: String(book.id),
    name: book.title,
    description: getAuthorName(book),
    price: 0,
    imageUrl: getImageUrl(book),
  };
}
