export default async function BookDetails({ params }: any) {
  const { id } = params;

  const res = await fetch(`https://gutendex.com/books/${id}`);
  let book = null;

  try {
    book = await res.json();
  } catch (e) {
    book = null;
  }

  if (!book || !book.id) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-xl">No se encontró información del libro.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-10">
      <h1 className="text-3xl font-semibold">{book.title}</h1>

      <p className="mt-4 text-neutral-400">
        Autor: {book.authors?.[0]?.name ?? "Desconocido"}
      </p>

      <p className="mt-6 leading-relaxed max-w-xl">
        {book?.subjects?.join(", ") || "Este libro no tiene descripción."}
      </p>
    </div>
  );
}
