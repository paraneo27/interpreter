import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import translations, { Language } from 'src/app/(components)/translations';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('La clave OPENAI_API_KEY no está definida en las variables de entorno.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { symptoms, language }: { symptoms: string; language: Language } = await req.json();

    // Validación de entrada
    if (!symptoms || typeof symptoms !== 'string') {
      return new Response(
        JSON.stringify({ error: translations[language]?.errorEmpty || 'Invalid input' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (symptoms.length > 1000) {
      return new Response(
        JSON.stringify({ error: translations[language]?.errorLong || 'Input too long' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prompt en el idioma correspondiente
    const prompt = language === 'en'
      ? `

Based on the theories of Alejandro Jodorowsky, Louise Hay, Mario Alonso Puig, and Antonio Damasio.
You are a professional consultant in emotional well-being.  
Analyze the following symptoms and provide a response that includes:  

1. A concise explanation of the potential emotional root related to the symptoms.  
2. A specific affirmation that directly supports emotional healing for the symptoms described.  
3. Practical habits or actions that can help address the emotional root.  
4. A helpful perspective to empower the person and foster positive change.  

Your response must:  
- Be formatted as a clear, structured list.  
- Avoid greetings, introductions, or sign-offs.  
- Use a professional, supportive, and neutral tone.  
- Focus on actionable advice and healing affirmations that correspond to the described symptoms.  

Symptoms: "${symptoms}"

      `
      : `
        Eres un consultor profesional y empático en bienestar emocional. 
        Analiza los siguientes síntomas y proporciona una respuesta reflexiva que identifique 
        posibles raíces emocionales y ofrezca consejos prácticos y aplicables. 
        De acuerdo con las teorias de Alejandro Jodoroski, Louisa Hay, Mario Alonso Puig, Antonio Damasio.
 
Analiza los siguientes síntomas y proporciona una respuesta clara, concisa y práctica.  
Enfócate en identificar posibles raíces emocionales y ofrecer consejos aplicables.  

- Una explicación concisa de la posible raíz emocional relacionada con los síntomas.  
- Una afirmación específica que apoye directamente la sanación emocional de los síntomas descritos.  
- Hábitos o acciones prácticas que puedan ayudar a abordar la raíz emocional.  
- Una perspectiva útil para empoderar a la persona y fomentar un cambio positivo.  

Tu respuesta debe:  
- Estar formateada como una lista clara y estructurada.  
- Evitar saludos, introducciones o cierres.  
- Usar un tono profesional, de apoyo y neutral.  
- Enfocarse en consejos aplicables y afirmaciones de sanación que correspondan a los síntomas descritos.  


Síntomas:  "${symptoms}"
      `;

    // Solicitud a OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: language === 'en' ? 'You are a professional emotional diagnosis consultant.' : 'Eres un consultor profesional de diagnóstico emocional.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.66,
    });

    const rawResponse = response.choices[0]?.message?.content || translations[language]?.sections?.noContent || 'No content available';


    // Procesar la respuesta cruda en secciones compatibles con el frontend
    const sections = rawResponse.split('\n\n').map((paragraph) => {
      const lines = paragraph.split('\n');
      const title = lines[0]?.trim() || '';
      const content = lines.slice(1).join(' ').trim();

      return {
        title,
        content,
      };
    });

    return new Response(
      JSON.stringify({ data: sections }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al procesar la solicitud:', error);
    return new Response(
      JSON.stringify({ error: translations['es']?.error || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
