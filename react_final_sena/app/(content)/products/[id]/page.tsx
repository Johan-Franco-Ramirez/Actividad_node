import { getProductById } from "@/services/productService";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) return <div>No encontrado</div>;

  return (
    <div>
      {product.imageUrl ? (
        <img src={product.imageUrl} width={200} />
      ) : (
        <div style={{ width: 200, height: 200, background: "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span>Sin imagen</span>
        </div>
      )}
      <h1>{product.name}</h1>
      <p>Autor: {product.description}</p>
    </div>
  );
}
