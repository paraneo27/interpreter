// Definición del tipo `Language`
export type Language = 'en' | 'es';

// Definición del tipo `TranslationContent`
export type TranslationContent = {
  title: string;
  description: string;
  bullet1Title: string;
  bullet1: string;
  bullet2Title: string;
  bullet2: string;
  bullet3Title: string;
  bullet3: string;
  bullet4Title: string;
  bullet4: string;
  bullet5Title: string;
  bullet5: string;
  bullet6Title: string;
  bullet6: string;
  placeholder: string;
  buttonLang: string;
  interpretButton: string;
  loading: string;
  error: string;
  errorEmpty: string;
  errorLong: string;
  prompt: string;
  sections: {
    interpretation: string;
    symbols: string;
    questions: string;
    advice: string;
    noContent: string;
  };
};

// Traducciones
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
Eres un experto en interpretación de sueños. Analiza el siguiente sueño y responde en las siguientes secciones:

### Interpretación
Proporciona un análisis detallado y creativo del sueño.

### Símbolos y Significados
Identifica los símbolos clave y explica sus posibles significados.

### Preguntas para Reflexionar
Formula tres preguntas que inviten a la introspección.

### Consejo Práctico
Da una recomendación útil y aplicable en la vida cotidiana.

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
You are an expert dream interpreter. Analyze the following dream and respond with the following sections:

### Interpretation
Provide a detailed and creative analysis of the dream.

### Symbols and Meanings
Identify the key symbols and explain their possible meanings.

### Reflective Questions
Formulate three questions that invite introspection.

### Practical Advice
Give a useful and applicable recommendation for daily life.

Dream: "{dream}"`,
    sections: {
      interpretation: 'Interpretation',
      symbols: 'Symbols and Meanings',
      questions: 'Reflective Questions',
      advice: 'Practical Advice',
      noContent: 'No content available.',
    },
  },
  
};

export default translations;
