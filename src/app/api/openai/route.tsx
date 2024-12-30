import { NextRequest } from 'next/server';
import OpenAI from 'openai';

// Configuración de OpenAI
if (!process.env.OPENAI_API_KEY) {
  throw new Error('La clave OPENAI_API_KEY no está definida en las variables de entorno.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint para manejar solicitudes POST
export async function POST(req: NextRequest) {
  try {
    const { dream, language } = await req.json();

    if (!dream || typeof dream !== 'string') {
      const errorMessage = language === 'en' ? 'The "dream" field is required.' : 'El campo "sueño" es obligatorio.';
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (dream.length > 1000) {
      const lengthMessage = language === 'en' ? 'The dream is too long. Reduce it to less than 1000 characters.' : 'El sueño es demasiado largo. Redúcelo a menos de 1000 caracteres.';
      return new Response(
        JSON.stringify({ error: lengthMessage }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const prompt = language === 'en'
      ? `
You are an expert dream therapist. Analyze the following dream and respond with the following sections, separated by "###":

### Interpretation
Provide a detailed and creative analysis of the dream.

### Symbols and Meanings
Identify the key symbols and explain their possible meanings.

### Reflective Questions
Formulate three questions that invite introspection.

### Practical Advice
Give a useful and applicable recommendation for daily life.

Dream: "${dream}"
`
      : `
Eres un terapeuta experto en interpretación de sueños. Analiza el siguiente sueño y responde en las siguientes secciones, separadas por "###":

### Interpretación
Proporciona un análisis detallado y creativo del sueño.

### Símbolos y Significados
Identifica los símbolos clave y explica sus posibles significados.

### Preguntas para Reflexionar
Formula tres preguntas que inviten a la introspección.

### Consejo Práctico
Da una recomendación útil y aplicable en la vida cotidiana.

Sueño: "${dream}"
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: language === 'en' ? 'You are an expert dream interpreter.' : 'Eres un terapeuta experto en interpretación de sueños.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.66,
    });

    const rawResponse = response.choices[0]?.message?.content || (language === 'en' ? 'Interpretation could not be generated.' : 'No se pudo generar una interpretación.');

    const sections = rawResponse.split('###').map((section) => section.trim()).filter(Boolean);

    const structuredResponse = [
      { title: language === 'en' ? 'Interpretation' : 'Interpretación', content: sections.find((s) => s.startsWith('Interpretation') || s.startsWith('Interpretación'))?.replace(/^(Interpretation|Interpretación)/, '').trim() || (language === 'en' ? 'Not available' : 'No disponible') },
      { title: language === 'en' ? 'Symbols and Meanings' : 'Símbolos y Significados', content: sections.find((s) => s.startsWith('Symbols and Meanings') || s.startsWith('Símbolos y Significados'))?.replace(/^(Symbols and Meanings|Símbolos y Significados)/, '').trim() || (language === 'en' ? 'Not available' : 'No disponible') },
      { title: language === 'en' ? 'Reflective Questions' : 'Preguntas para Reflexionar', content: sections.find((s) => s.startsWith('Reflective Questions') || s.startsWith('Preguntas para Reflexionar'))?.replace(/^(Reflective Questions|Preguntas para Reflexionar)/, '').trim().split('\n').filter(Boolean) || [(language === 'en' ? 'Not available' : 'No disponible')] },
      { title: language === 'en' ? 'Practical Advice' : 'Consejo Práctico', content: sections.find((s) => s.startsWith('Practical Advice') || s.startsWith('Consejo Práctico'))?.replace(/^(Practical Advice|Consejo Práctico)/, '').trim() || (language === 'en' ? 'Not available' : 'No disponible') },
    ];

    return new Response(
      JSON.stringify({ data: structuredResponse }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error al procesar la solicitud:', error);
    return new Response(
      JSON.stringify({ error: language === 'en' ? 'Internal server error.' : 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}