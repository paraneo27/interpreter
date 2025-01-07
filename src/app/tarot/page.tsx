'use client';

import TarotCelticCross from './TarotCelticCross';
import DreamyBackground from '../(components)/DreamyBackground';
import Navbar from '../(components)/Navbar';
import { useLanguage } from '../(components)/LanguageContext';

export default function TarotPage() {
  const { language } = useLanguage();

  return (
    <div className="relative">
      <DreamyBackground />
      <Navbar />
      <div className="max-w-3xl mx-auto mt-20 relative z-10">
        <h1 className="text-4xl font-extrabold text-center text-white mb-2">Tarot</h1>
        <TarotCelticCross language={language} />
      </div>
    </div>
  );
}
