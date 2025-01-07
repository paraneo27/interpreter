'use client';

import React from 'react';
import EmotionalDiagnosis from './EmotionalDiagnosis';
import DreamyBackground from '../(components)/DreamyBackground';
import Navbar from '../(components)/Navbar';
import { useLanguage } from '../(components)/LanguageContext';

export default function EmotionalPage() {
  const { language } = useLanguage();

  return (
    <div className="relative">
      <DreamyBackground />
      <Navbar />
      <div className="max-w-3xl mx-auto mt-20 relative z-10">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          {language === 'en' ? 'Emotional Diagnosis' : 'Diagnóstico Emocional'}
        </h1>
        <EmotionalDiagnosis language={language} />
      </div>
    </div>
  );
}
