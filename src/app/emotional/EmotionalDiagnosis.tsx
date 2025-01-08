'use client';

import React, { useState } from 'react';
import "tailwindcss/tailwind.css";
import LoadingConstellation from '../(components)/LoadingConstellation';

interface Section {
  title: string;
  content: string | string[];
}

interface EmotionalDiagnosisProps {
  language: 'es' | 'en'; // Define el idioma para traducción
}

const EmotionalDiagnosis: React.FC<EmotionalDiagnosisProps> = ({ language }) => {
  const [symptoms, setSymptoms] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInterpret = async () => {
    // Limpiar errores previos y datos
    setError(null);
    setSections([]);

    // Validar entrada
    if (!symptoms.trim()) {
      setError(language === 'en' ? 'Symptoms cannot be empty.' : 'Los síntomas no pueden estar vacíos.');
      return;
    }

    if (symptoms.length > 1000) {
      setError(
        language === 'en'
          ? 'Symptoms are too long. Please shorten them to less than 1000 characters.'
          : 'Los síntomas son demasiado largos. Redúcelos a menos de 1000 caracteres.'
      );
      return;
    }

    setLoading(true);

    try {
      // Enviar solicitud al endpoint
      const response = await fetch('/api/emotional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch emotional analysis');
      }

      const data = await response.json();

      if (data.data && Array.isArray(data.data)) {
        setSections(data.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error during interpretation:', err);
      setError(
        language === 'en'
          ? 'Error fetching emotional analysis. Please try again.'
          : 'Error al obtener el análisis emocional. Inténtalo de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100/90 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        {language === 'en' ? 'Analysis of Correspondence Between Illnesses and Emotions' 
        : 
        'Análisis de Correspondencia entre enfermedades y emociones'}
      </h1>
      <p className="text-gray-700 text-center mt-2">
        {language === 'en'
          ? 'Describe your symptoms and get an emotional analysis based on expert principles.'
          : 'Describe tus síntomas y obtén un análisis emocional basado en principios expertos.'}
      </p>
      <textarea
        className="w-full p-4 mt-4 border rounded-lg text-gray-600"
        placeholder={language === 'en' ? 'Write your symptoms here...' : 'Escribe tus síntomas aquí...'}
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      ></textarea>
<button
  className="mt-4 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 focus:outline-none flex items-center justify-center"
  onClick={handleInterpret}
  disabled={loading}
>
  {loading ? (
    <div className="flex items-center">
      <LoadingConstellation />
    </div>
  ) : language === 'en' ? (
    'Get Analysis'
  ) : (
    'Obtener Análisis'
  )}
</button>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      {sections.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl text-gray-700">
            {language === 'en' ? 'Analysis Results:' : 'Resultados del Análisis:'}
          </h2>
          {sections.map((section, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-md text-gray-800">{section.title}</h3>
              <p className="mt-2 text-md text-gray-700">
                {Array.isArray(section.content) ? section.content.join(', ') : section.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmotionalDiagnosis;
