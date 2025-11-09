
import { GoogleGenAI, Chat, GenerateContentResponse, Type } from '@google/genai';
import { WasteAnalysis } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    itemName: { type: Type.STRING, description: 'Name of the waste item detected.' },
    materialType: { type: Type.STRING, description: 'Primary material of the item.' },
    category: {
      type: Type.STRING,
      enum: ['Recyclable', 'Compostable', 'E-waste', 'Hazardous', 'Textile', 'General Waste'],
      description: 'The waste category.'
    },
    disposalMethod: { type: Type.STRING, description: 'Recommended disposal method.' },
    recycledInto: { type: Type.STRING, description: 'What this item can be recycled into.' },
    ecoTip: { type: Type.STRING, description: 'An actionable sustainability tip.' },
    impactFact: { type: Type.STRING, description: 'An environmental impact fact.' },
    error: { type: Type.STRING, description: 'Error message if image is unclear.' }
  },
  required: ['itemName', 'materialType', 'category', 'disposalMethod', 'recycledInto', 'ecoTip', 'impactFact']
};

export async function analyzeWasteImage(base64Image: string, mimeType: string): Promise<WasteAnalysis> {
  const prompt = `You are EcoSort, an expert AI sustainability assistant. Analyze the user-provided image of a waste item. Respond ONLY with a valid JSON object that adheres to the provided schema. Do not include any other text, greetings, or explanations outside of the JSON object. If the image is unclear or doesn't contain a distinct waste item, set the "error" field in your response.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType, data: base64Image } },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      }
    });
    
    const jsonString = response.text;
    const parsedJson = JSON.parse(jsonString);

    if (parsedJson.error) {
        throw new Error(parsedJson.error);
    }

    return parsedJson as WasteAnalysis;
  } catch (error) {
    console.error("Gemini API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during analysis.";
    if (errorMessage.includes('Image unclear')) {
      return { error: errorMessage } as WasteAnalysis;
    }
    return { error: 'Failed to analyze the image. Please try again with a clearer picture.' } as WasteAnalysis;
  }
}

export function createEcoSortChat(): Chat {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are EcoSort, a friendly and knowledgeable AI assistant specializing in sustainability, recycling, and environmental topics. Answer user questions accurately and concisely. Use emojis to make your answers engaging.',
        },
    });
}
