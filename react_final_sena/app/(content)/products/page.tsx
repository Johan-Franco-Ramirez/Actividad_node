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
  <div className="max-w-7xl mx-auto px-6 py-10">
    <h1 className="text-3xl font-bold text-center mb-10">
      📚 Libros de Project Gutenberg
    </h1>

    {/* GRID DE LIBROS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <div className="bg-[#111] rounded-xl p-4 shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <img
              src={product.imageUrl}
              className="w-full h-64 object-cover rounded-lg"
            />

            <h3 className="text-white mt-3 font-semibold text-lg">
              {product.name}
            </h3>

            <p className="text-gray-400 text-sm">
              {product.description || "Sin descripción disponible"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);


}
