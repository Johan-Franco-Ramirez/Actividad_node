import { Product } from "../../types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded border p-4">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm">{product.description}</p>
      <p className="mt-2 font-medium">${product.price}</p>
    </div>
  );
}
