'use client';

import { useState } from 'react';
import DreamForm from './(features)/dream-consultation/DreamForm';
import DreamResultsProps from './(features)/dream-consultation/DreamResultsProps';
import DreamyBackground from './(components)/DreamyBackground';
import { LanguageProvider } from './(components)/LanguageContext';



export default function Page() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInterpretDream = async (dream: string) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dream }),
      });

      if (!res.ok) throw new Error('Error al procesar la solicitud.');

      const data = await res.json();
      setResponse(data.data); // Guardamos la respuesta del backend
    } catch (error) {
      console.error(error);
      setError('Hubo un problema al interpretar el sueño. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LanguageProvider>
    <div className="relative">
      {/* Fondo animado */}
      <DreamyBackground />

      {/* Contenido principal */}
      <div className="max-w-3xl mx-auto mt-4 relative z-10">
        <h1 className="text-4xl font-extrabold text-center text-white mb-2">INTERPRETER</h1>
        
        <DreamForm onSubmit={handleInterpretDream} loading={loading} />

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {response && <DreamResultsProps response={response} />}
      </div>
    </div>
    </LanguageProvider>
  );
}
