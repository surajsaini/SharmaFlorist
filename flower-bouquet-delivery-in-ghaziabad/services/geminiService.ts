import { GoogleGenAI } from "@google/genai";
import { AICustomRequest } from "../types";

const apiKey = process.env.API_KEY || '';

export const generateBouquetImage = async (request: AICustomRequest): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `A realistic, high-quality professional photography of a beautiful flower bouquet. 
  Details:
  - Flowers: ${request.flowerType}
  - Flower Color: ${request.color}
  - Wrapping Paper: ${request.paperColor}
  - Size: ${request.size}
  - Occasion Context: ${request.occasion}
  
  The image should be centered, well-lit, and look like a product photo from a high-end florist shop in India.`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001', // Using high-quality image model
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1',
        outputMimeType: 'image/jpeg',
      },
    });

    const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (!base64ImageBytes) {
      throw new Error("No image generated");
    }

    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};