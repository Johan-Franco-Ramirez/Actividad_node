import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link href="/">Inicio</Link>
      <Link href="/products">Productos</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
