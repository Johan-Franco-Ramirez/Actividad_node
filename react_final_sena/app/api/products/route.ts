import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    { id: "1", name: "Producto 1", description: "", price: 10, imageUrl: "" },
    { id: "2", name: "Producto 2", description: "", price: 20, imageUrl: "" },
  ];
  return NextResponse.json({ products });
}
