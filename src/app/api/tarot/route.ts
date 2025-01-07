import { NextRequest, NextResponse } from 'next/server';
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
    const { cards, language } = await req.json();

    if (!cards || !Array.isArray(cards) || cards.length !== 10) {
      const errorMessage = language === 'en'
        ? 'You must provide exactly 10 tarot cards for the interpretation.'
        : 'Debe proporcionar exactamente 10 cartas del tarot para la interpretación.';
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cardDescriptions = cards.map((card: any, index: number) => 
      `Position ${index + 1}: ${card.name} (${card.position})`
    ).join('\n');

    const prompt = language === 'en'
      ? `
Act as an expert Tarot reader, specializing in the Tarot de Marseille. 
Perform a detailed and impartial interpretation of the provided 10 cards in the Celtic Cross spread. 
Structure your response using the following sections, separated by "###":

Interpretation
Provide a thorough analysis of the Celtic Cross spread.
Explain the significance of each card's position and how it interacts with the others in the context of the querent's situation.
Ensure the interpretation flows cohesively, offering insight into past influences, present circumstances, and future possibilities.
Symbolic Perspectives
Highlight the key symbols in each card.
Explain their meanings, drawing connections to the querent's context or universal archetypes.
Incorporate the traditional symbolism of the Tarot de Marseille.
Reflective Questions
Suggest three introspective questions based on the themes and insights revealed by the spread.
Ensure the questions are open-ended and encourage deep reflection and self-awareness.
Practical Advice
Provide clear, concise, and actionable guidance that the querent can apply to their current situation.
Base the advice on the overall themes and messages from the reading, ensuring it is empowering and constructive.
Ensure your response is balanced, professional, and sensitive to the querent's potential concerns. 
Adapt your tone to be warm and insightful, offering clarity and encouragement.

Cards:
${cardDescriptions}
`
      : `
Actúa como un experto lector de Tarot, especializado en el Tarot de Marsella. 
Realiza una interpretación detallada e imparcial de las 10 cartas proporcionadas en la tirada de la Cruz Celta. 
Estructura tu respuesta utilizando las siguientes secciones, separadas por "###":

Interpretación
Proporciona un análisis completo de la tirada
Explica el significado de cada posición y cómo las cartas interactúan entre sí en el contexto de la situación del consultante.
Asegúrate de que la interpretación sea coherente, ofreciendo claridad sobre influencias pasadas, 
circunstancias presentes y posibilidades futuras.

Perspectivas Simbólicas
Destaca los símbolos clave de cada carta con amplio detalle descriptivo
Explica sus significados, conectándolos con el contexto del consultante o con arquetipos universales.
Incorpora el simbolismo tradicional del Tarot de Marsella.
Preguntas para Reflexionar
Sugiere tres preguntas introspectivas basadas en los temas y revelaciones de la tirada.
Asegúrate de que las preguntas sean abiertas y fomenten una reflexión profunda y autoconocimiento.
Consejo Práctico
Ofrece una guía clara, concisa y práctica que el consultante pueda aplicar a su situación actual.
Basa el consejo en los temas y mensajes generales de la lectura, asegurándote de que sea empoderador y constructivo.
Asegúrate de que tu respuesta sea equilibrada, profesional y sensible a las posibles preocupaciones del consultante. 
Adapta tu tono para ser cálido y perspicaz, brindando claridad y motivación.

Cartas:
${cardDescriptions}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: language === 'en' ? 'You are an expert tarot reader.' : 'Eres un lector experto en tarot.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const rawResponse = response.choices[0]?.message?.content || (language === 'en' ? 'Interpretation could not be generated.' : 'No se pudo generar una interpretación.');

    const sections = rawResponse.split('###').map((section) => section.trim()).filter(Boolean);

    const structuredResponse = [
      { title: language === 'en' ? 'Interpretation' : 'Interpretación', content: sections.find((s) => s.startsWith('Interpretation') || s.startsWith('Interpretación'))?.replace(/^(Interpretation:|Interpretación:)/, '').trim() || (language === 'en' ? 'Not available' : 'No disponible') },
      { title: language === 'en' ? 'Symbolic Insights' : 'Perspectivas Simbólicas', content: sections.find((s) => s.startsWith('Symbolic Insights') || s.startsWith('Perspectivas Simbólicas'))?.replace(/^(Symbolic Insights:|Perspectivas Simbólicas:)/, '').trim() || (language === 'en' ? 'Not available' : 'No disponible') },
      { title: language === 'en' ? 'Reflective Questions' : 'Preguntas para Reflexionar', content: sections.find((s) => s.startsWith('Reflective Questions') || s.startsWith('Preguntas para Reflexionar'))?.replace(/^(Reflective Questions:|Preguntas para Reflexionar:)/, '').trim().split('\n').filter(Boolean) || [(language === 'en' ? 'Not available' : 'No disponible')] },
      { title: language === 'en' ? 'Practical Advice' : 'Consejo Práctico', content: sections.find((s) => s.startsWith('Practical Advice') || s.startsWith('Consejo Práctico'))?.replace(/^(Practical Advice:|Consejo Práctico:)/, '').trim() || (language === 'en' ? 'Not available' : 'No disponible') },
    ];

    return new Response(
      JSON.stringify({ data: structuredResponse }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: language === 'es' ? 'Internal server error.' : 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
