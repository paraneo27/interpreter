import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-blue-500 text-white py-4 shadow">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-lg font-bold">Interpreter</h1>
        <nav className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
          <Link href="/dream-consultation" className="hover:underline">
            Consultar Sueño
          </Link>
          <Link href="/resources" className="hover:underline">
            Recursos
          </Link>
        </nav>
      </div>
    </header>
  );
}
