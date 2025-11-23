
import { GoogleGenAI } from "@google/genai";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDishDescription = async (dishName: string, ingredients: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key missing. Returning fallback description.");
    return "A delicious homemade dish prepared with love and fresh ingredients.";
  }

  try {
    const prompt = `
      You are a warm, motherly home chef assistant for an app called "HomeFudio".
      Write a short, appetizing, and heartwarming description (max 2 sentences) for a dish named "${dishName}".
      The ingredients are: ${ingredients}.
      Focus on the "homemade", "comfort", and "fresh" aspects. Do not use hashtags.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Freshly cooked with love.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Freshly cooked with love.";
  }
};

export const generateChefBio = async (name: string, specialties: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return `Hi, I'm ${name}! I love cooking ${specialties} for my neighbors.`;
  }

  try {
    const prompt = `
      You are a profile writer for a home cook app called "HomeFudio". Write a warm, welcoming, and trustworthy bio (max 3 sentences) for a home chef named "${name}".
      Their specialties are: "${specialties}".
      The tone should be like a friendly neighbor inviting you for dinner. Mention hygiene and love for cooking.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || `Hi, I'm ${name}! I love cooking ${specialties} for my neighbors.`;
  } catch (error) {
    return `Hi, I'm ${name}! I love cooking ${specialties} for my neighbors.`;
  }
};
