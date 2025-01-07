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
    const { dream, language }: { dream: string; language: Language } = await req.json();

    if (!dream || typeof dream !== 'string') {
      return new Response(
        JSON.stringify({ error: translations[language].errorEmpty }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (dream.length > 1000) {
      return new Response(
        JSON.stringify({ error: translations[language].errorLong }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const prompt = translations[language].prompt.replace('{dream}', dream);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: language === 'en' ? 'You are an expert dream interpreter.' : 'Eres un terapeuta experto en interpretación de sueños.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.66,
    });

    const rawResponse = response.choices[0]?.message?.content || translations[language].sections.noContent;

    const sections = rawResponse.split('###').map((section) => section.trim()).filter(Boolean);

    const structuredResponse = [
      {
        title: translations[language].sections.interpretation,
        content: sections.find((s) => s.startsWith(translations[language].sections.interpretation))?.replace(new RegExp(`^${translations[language].sections.interpretation}`), '').trim() || translations[language].sections.noContent,
      },
      {
        title: translations[language].sections.symbols,
        content: sections.find((s) => s.startsWith(translations[language].sections.symbols))?.replace(new RegExp(`^${translations[language].sections.symbols}`), '').trim() || translations[language].sections.noContent,
      },
      {
        title: translations[language].sections.questions,
        content: sections.find((s) => s.startsWith(translations[language].sections.questions))?.replace(new RegExp(`^${translations[language].sections.questions}`), '').trim().split('\n').filter(Boolean) || [translations[language].sections.noContent],
      },
      {
        title: translations[language].sections.advice,
        content: sections.find((s) => s.startsWith(translations[language].sections.advice))?.replace(new RegExp(`^${translations[language].sections.advice}`), '').trim() || translations[language].sections.noContent,
      },
    ];

    return new Response(
      JSON.stringify({ data: structuredResponse }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al procesar la solicitud:', error);
    return new Response(
      JSON.stringify({ error: translations['es'].error }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
