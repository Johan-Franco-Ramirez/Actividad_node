export default function PlansPage() {
  const plans = [
    {
      name: "Básico",
      price: "$10.000 / mes",
      features: ["Ver libros", "Cuenta estándar"],
    },
    {
      name: "Premium",
      price: "$25.000 / mes",
      features: ["Todo lo del básico", "Soporte prioritario", "Sin límites"],
    },
    {
      name: "Pro",
      price: "$50.000 / mes",
      features: ["Todo lo del premium", "Acceso anticipado", "Beneficios extra"],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-10">
      <h1 className="text-3xl mb-6">Planes de Suscripción</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.name}
            className="bg-neutral-900 p-6 rounded-xl border border-neutral-800"
          >
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-neutral-400 mt-2">{p.price}</p>

            <ul className="mt-4 space-y-1 text-sm">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>

            <button className="mt-5 w-full bg-white text-black py-2 rounded-lg hover:bg-neutral-300 transition">
              Suscribirme
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
