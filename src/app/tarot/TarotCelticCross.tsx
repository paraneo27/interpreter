import React, { useState, useEffect } from 'react';
import "tailwindcss/tailwind.css";
import LoadingConstellation from '../(components)/LoadingConstellation';

interface Card {
  name: string;
  position: 'upright' | 'reversed';
}

interface Section {
  title: string;
  content: string | string[];
}

const TAROT_DECK: Card[] = Array.from({ length: 78 }, (_, i) => ({
  name: `Card ${i + 1}`,
  position: Math.random() > 0.5 ? 'upright' : 'reversed',
}));

interface TarotCelticCrossProps {
  language: 'en' | 'es'; // Especifica el tipo del idioma para evitar errores
}

const TarotCelticCross: React.FC<TarotCelticCrossProps> = ({ language }) => {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [manualSelection, setManualSelection] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('Active language:', language);
  }, [language]);

  const drawCardsRandomly = () => {
    const shuffledDeck = [...TAROT_DECK].sort(() => Math.random() - 0.5);
    const drawnCards = shuffledDeck.slice(0, 10);
    setSelectedCards(drawnCards);
    interpretCards(drawnCards);
  };

  const toggleManualSelection = () => {
    setManualSelection((prev) => !prev);
    setSelectedCards([]);
    setSections([]);
  };

  const selectCardManually = (card: Card) => {
    if (selectedCards.length < 10 && !selectedCards.some((c) => c.name === card.name)) {
      setSelectedCards((prev) => [...prev, card]);
    }
  };

  const interpretCards = async (selectedCards: Card[]) => {
    setLoading(true);

    try {
      const response = await fetch('/api/tarot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cards: selectedCards, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch interpretation');
      }

      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        setSections(data.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error interpreting cards:', error);
      setSections([
        {
          title: language === 'en' ? 'Error' : 'Error',
          content: language === 'en'
            ? 'Error fetching interpretation. Please try again.'
            : 'Error al obtener la interpretación. Inténtalo de nuevo.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100/90 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        {language === 'en' ? 'Tarot Reading' : 'Lectura de Tarot'}
      </h1>

      <div className="mt-4 flex flex-col items-center">
        {!manualSelection ? (
          <button
            className="px-6 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-700 focus:outline-none"
            onClick={drawCardsRandomly}
            disabled={loading}
          >
            {language === 'en' ? 'Draw 10 Cards Randomly' : 'Seleccionar 10 Cartas al Azar'}
          </button>
        ) : (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {TAROT_DECK.map((card, index) => {
              const isSelected = selectedCards.some((c) => c.name === card.name);
              return (
                <button
                  key={index}
                  className={`p-2 border rounded-lg shadow-sm ${
                    isSelected ? 'bg-yellow-500 cursor-not-allowed' : 'bg-purple-400 hover:bg-gray-200'
                  }`}
                  onClick={() => selectCardManually(card)}
                  disabled={isSelected}
                >
                  {card.name} ({card.position})
                </button>
              );
            })}
          </div>
        )}
        <button
          className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-400 focus:outline-none"
          onClick={toggleManualSelection}
        >
          {manualSelection
            ? language === 'en'
              ? 'Switch to Random Selection'
              : 'Cambiar a Selección Aleatoria'
            : language === 'en'
            ? 'Switch to Manual Selection'
            : 'Cambiar a Selección Manual'}
        </button>

        {selectedCards.length === 10 && (
          <button
            className="mt-4 px-6 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-700 focus:outline-none"
            onClick={() => interpretCards(selectedCards)}
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
        )}
      </div>

      {sections.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">
            {language === 'en' ? 'Interpretation:' : 'Interpretación:'}
          </h2>
          {sections.map((section, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-md font-bold text-gray-900">{section.title}</h3>
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

export default TarotCelticCross;
