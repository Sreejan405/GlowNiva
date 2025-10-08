"use server";

import { getPersonalizedRecommendations } from "@/ai/flows/ai-product-recommendation";
import { z } from "zod";
import { products } from "./data";

const recommendationSchema = z.object({
  skinType: z.string().min(1, "Please select your skin type."),
  preferences: z.string().min(3, "Please describe your preferences."),
});

type State = {
  message?: string | null;
  recommendation?: string | null;
  reason?: string | null;
  product?: any | null;
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

  // For this demo, we'll create a simple review summary from our mock data.
  // In a real app, this could be a more complex aggregation.
  const reviewSummary = products
    .slice(0, 5)
    .map(p => 
      `Product: ${p.title}. Reviews: ${p.reviews.map(r => r.body).join(' ')}`
    )
    .join('\n');

  try {
    const result = await getPersonalizedRecommendations({
      skinType,
      preferences,
      reviewSummary,
    });
    
    // Try to find the recommended product in our mock data
    const recommendedProduct = products.find(p => 
      result.recommendation.toLowerCase().includes(p.title.toLowerCase())
    );

    return {
      message: "Success!",
      recommendation: result.recommendation,
      reason: result.reason,
      product: recommendedProduct || null,
    };
  } catch (error) {
    console.error("AI recommendation error:", error);
    return {
      message: "An error occurred while getting your recommendation. Please try again.",
    };
  }
}
