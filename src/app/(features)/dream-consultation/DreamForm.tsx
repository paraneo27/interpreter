'use client';

import { useState } from 'react';
import DreamResultsProps from './DreamResultsProps';
import { useLanguage } from 'src/app/(components)/LanguageContext';
import translations from 'src/app/(components)/translations';

export default function DreamForm() {
  const [dream, setDream] = useState(''); // Sueño ingresado por el usuario
  const [response, setResponse] = useState<any | null>(null); // Respuesta estructurada del backend
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Mensajes de error
  const { language, toggleLanguage } = useLanguage(); // Estado y función del idioma
  const text = translations[language]; // Traducciones dinámicas según el idioma

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dream.trim()) {
      setError(text.errorEmpty); // Muestra error si el campo está vacío
      return;
    }

    if (dream.length > 1000) {
      setError(text.errorLong); // Muestra error si el sueño es demasiado largo
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dream, language }), // Enviamos el idioma seleccionado al backend
      });

      if (!res.ok) throw new Error(text.error);

      const data = await res.json();
      setResponse(data.data); // Recibe la respuesta estructurada del backend
    } catch (error) {
      console.error(error);
      setError(text.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
      {/* Título */}
      <h1 className="text-xl font-extrabold text-gray-800 mb-6 text-center">
        {text.title}
      </h1>

      {/* Descripción */}
      <p className="text-gray-600 text-center mb-6">{text.description}</p>

      {/* Instrucciones */}
      <div className="text-gray-600 text-sm leading-relaxed mb-6">
        <ul className="list-disc list-inside space-y-2">
          {[
            { title: text.bullet1Title, desc: text.bullet1 },
            { title: text.bullet2Title, desc: text.bullet2 },
            { title: text.bullet3Title, desc: text.bullet3 },
            { title: text.bullet4Title, desc: text.bullet4 },
            { title: text.bullet5Title, desc: text.bullet5 },
            { title: text.bullet6Title, desc: text.bullet6 },
          ].map((item, index) => (
            <li key={index}>
              <strong>{item.title}:</strong> {item.desc}
            </li>
          ))}
        </ul>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder={text.placeholder}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
        />
        <div className="space-y-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? text.loading : text.interpretButton}
          </button>
          <button
            type="button"
            onClick={toggleLanguage}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            {text.buttonLang}
          </button>
        </div>
      </form>

      {/* Mensajes de error */}
      {error && (
        <p className="text-red-500 mt-4 text-center font-medium">{error}</p>
      )}

      {/* Resultado */}
      {response && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
          <DreamResultsProps response={response} language={language} />
        </div>
      )}
    </div>
  );
}