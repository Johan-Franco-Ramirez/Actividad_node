"use client";

import { useEffect, useState } from "react";
import { listProducts } from "@/services/productService";
import { Product } from "@/types/product";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 🔐 Verificar si hay token (login)
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Si no hay login, lo manda al login
      return;
    }

    // 📚 Cargar libros solo si está logueado
    listProducts().then(setProducts);
  }, [router]);

  return (
  <div className="container">
    <h1 className="text-3xl font-bold text-center mb-8">
      📚 Libros de Project Gutenberg
    </h1>

    <div className="grid-books">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <div className="book-card">
            <img src={product.imageUrl} />
            <h3 className="book-title">{product.name}</h3>
            <p className="book-author">{product.description}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

}
