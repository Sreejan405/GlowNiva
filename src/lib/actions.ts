'use server';

import { getPersonalizedRecommendations, AIProductRecommendationOutput } from "@/ai/flows/ai-product-recommendation";
import { z } from "zod";
import { products } from "./data";
import { Product } from "./types";

const recommendationSchema = z.object({
  skinType: z.string().min(1, "Please select your skin type."),
  preferences: z.string().min(1, "Please select your main concern."),
});

type State = {
  message?: string | null;
  recommendation?: AIProductRecommendationOutput | null;
  errors?: {
    skinType?: string[];
    preferences?: string[];
  };
};

export async function getAiRecommendation(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = recommendationSchema.safeParse({
    skinType: formData.get("skinType"),
    preferences: formData.get("preferences"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  const { skinType, preferences } = validatedFields.data;

  // Provide the AI with a simplified list of available products.
  const availableProducts = products.map(p => ({
    title: p.title,
    description: p.description,
    skinTypes: p.skinTypes,
    tags: p.tags,
    benefits: p.benefits,
  }));

  try {
    const result = await getPersonalizedRecommendations({
      skinType,
      preferences,
      availableProducts,
    });
    
    return {
      message: "Success!",
      recommendation: result,
    };
  } catch (error) {
    console.error("AI recommendation error:", error);
    return {
      message: "An error occurred while getting your recommendation. Please try again.",
    };
  }
}
