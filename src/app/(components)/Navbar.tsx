'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-transparent p-4 fixed top-0 w-full z-20">
      <div className="max-w-6xl mx-auto flex justify-between items-center gap-2">
        {/* Usa rutas relativas al dominio */}
        <Link href="/dream" className="text-white hover:underline font-extrabold">
          Interpretar Sueños
        </Link>
        <Link href="/emotional" className="text-white hover:underline font-extrabold">
          Correspondencia Emocional
        </Link>
        <Link href="/tarot" className="text-white hover:underline font-extrabold">
          Tarot
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
