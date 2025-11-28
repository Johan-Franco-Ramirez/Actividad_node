export default function ProductDetail({ params }: { params: { id: string } }) {
  return <div className="p-6">Producto {params.id}</div>;
}
