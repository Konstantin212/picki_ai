import OpenAI from 'openai';

// Server-side OpenAI client. Uses public-named env var as requested, but should be set only on server.
const apiKey = process.env.OPEN_AI_KEY;

export const openai = new OpenAI({
  apiKey,
});
