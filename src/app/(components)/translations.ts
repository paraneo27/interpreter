const translations: Record<Language, TranslationContent> = {
  es: {
    title: 'Instrucciones para Redactar Tu Sueño',
    description: 'Describe tu sueño y obtén una interpretación con fundamentos.',
    bullet1Title: 'Sé Breve y Claro',
    bullet1: 'Describe tu sueño como si se lo contaras a un amigo.',
    bullet2Title: 'Contexto Inicial',
    bullet2: 'Menciona el lugar, personas, acciones, palabras, números...',
    bullet3Title: 'Acción Principal',
    bullet3: 'Escribe lo que pasó o lo más llamativo del sueño.',
    bullet4Title: 'Emoción',
    bullet4: 'Incluye cómo te sentiste en el sueño.',
    bullet5Title: 'Elementos Sobresalientes',
    bullet5: 'Enumera los detalles más recordados.',
    bullet6Title: 'Final',
    bullet6: 'Explica cómo terminó el sueño.',
    placeholder: 'Escribe tu sueño aquí...',
    buttonLang: 'Traducir a Inglés',
    interpretButton: 'Interpretar Sueño',
    loading: 'Interpretando...',
    error: 'Hubo un problema al interpretar el sueño.',
    errorEmpty: 'El campo del sueño no puede estar vacío.',
    errorLong: 'El sueño es demasiado largo. Redúcelo a menos de 1000 caracteres.',
    prompt: `
Eres un experto en interpretación de sueños, combinando las teorías y conocimientos de Carl Gustav Jung, Fritz Perls, Louisa Hay, Mauricio Puerta y Alejandro Jodorowsky. Analiza el siguiente sueño y proporciona una interpretación en las siguientes secciones:
1. **Interpretación**: Un análisis detallado y creativo.
2. **Símbolos y Significados**: Explica los símbolos clave y sus posibles significados.
3. **Preguntas para Reflexionar**: Formula tres preguntas introspectivas.
4. **Consejo Práctico**: Ofrece una recomendación útil para aplicar en la vida diaria.
Sueño: "{dream}"`,
    sections: {
      interpretation: 'Interpretación',
      symbols: 'Símbolos y Significados',
      questions: 'Preguntas para Reflexionar',
      advice: 'Consejo Práctico',
      noContent: 'No hay contenido disponible.',
    },
  },
  en: {
    title: 'Instructions to Write Your Dream',
    description: 'Describe your dream and receive an interpretation.',
    bullet1Title: 'Be Brief and Clear',
    bullet1: 'Describe your dream as if you were telling a friend.',
    bullet2Title: 'Initial Context',
    bullet2: 'Mention the place, people, actions, and relevant details.',
    bullet3Title: 'Main Action',
    bullet3: 'Write what happened or the most striking part of the dream.',
    bullet4Title: 'Emotion',
    bullet4: 'Include how you felt in the dream.',
    bullet5Title: 'Key Elements',
    bullet5: 'List things you clearly remember.',
    bullet6Title: 'Ending',
    bullet6: 'Explain how the dream ended.',
    placeholder: 'Write your dream here...',
    buttonLang: 'Translate to Spanish',
    interpretButton: 'Interpret Dream',
    loading: 'Interpreting...',
    error: 'There was an issue interpreting the dream.',
    errorEmpty: 'The dream field cannot be empty.',
    errorLong: 'The dream is too long. Please shorten it to less than 1000 characters.',
    prompt: `
You are an expert in dream interpretation, combining theories and insights from Carl Gustav Jung, Fritz Perls, Louisa Hay, Mauricio Puerta, and Alejandro Jodorowsky. Analyze the following dream and provide an interpretation in the following sections:
1. **Interpretation**: A detailed and creative analysis.
2. **Symbols and Meanings**: Explain the key symbols and their possible meanings.
3. **Questions for Reflection**: Formulate three introspective questions.
4. **Practical Advice**: Offer a useful recommendation for daily life.
Dream: "{dream}"`,
    sections: {
      interpretation: 'Interpretation',
      symbols: 'Symbols and Meanings',
      questions: 'Questions for Reflection',
      advice: 'Practical Advice',
      noContent: 'No content available.',
    },
  },
};

export default translations;
