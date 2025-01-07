interface Section {
  title: string;
  content: string | string[]; // Puede ser texto o una lista
}

interface DreamResultsProps {
  response: Section[] | null; // Respuesta estructurada del backend
  language: string; // Idioma seleccionado ('es' o 'en')
}

const translations = {
  es: {
    interpretation: 'Interpretación',
    symbols: 'Símbolos y Significados',
    reflection: 'Preguntas para Reflexionar',
    practicalAdvice: 'Consejo Práctico',
  },
  en: {
    interpretation: 'Interpretation',
    symbols: 'Symbols and Meanings',
    reflection: 'Reflective Questions',
    practicalAdvice: 'Practical Advice',
  },
};

export default function DreamResultsProps({ response, language }: DreamResultsProps) {
  if (!response || response.length === 0) return null;

  const text = translations[language]; // Traducciones dinámicas según el idioma

  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md space-y-6">
      {response.map((section, index) => {
        let translatedTitle = section.title;

        // Traducir los títulos según el idioma
        if (section.title.includes('Interpretación')) translatedTitle = text.interpretation;
        else if (section.title.includes('Símbolos')) translatedTitle = text.symbols;
        else if (section.title.includes('Preguntas')) translatedTitle = text.reflection;
        else if (section.title.includes('Consejo')) translatedTitle = text.practicalAdvice;

        return (
          <div key={index} className="space-y-4">
            <h2 className="text-xl font-bold text-blue-600">{translatedTitle}</h2>
            {Array.isArray(section.content) ? (
              <ul className="list-disc pl-5">
                {section.content.map((item, idx) => (
                  <li key={idx} className="text-gray-700">{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-800 leading-relaxed">{section.content}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
