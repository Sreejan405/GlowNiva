'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized facial mask recommendations.
 *
 * The flow takes user preferences, skin type, and product reviews into account to suggest the most suitable product.
 * It exports:
 * - `getPersonalizedRecommendations`: An async function that triggers the flow.
 * - `AIProductRecommendationInput`: The input type for the flow.
 * - `AIProductRecommendationOutput`: The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const AIProductRecommendationInputSchema = z.object({
  skinType: z
    .string()
    .describe('The user\'s skin type (e.g., oily, dry, sensitive, combination).'),
  preferences: z
    .string()
    .describe('The user\'s preferences for facial masks (e.g., moisturizing, anti-aging, brightening).'),
  reviewSummary: z
    .string()
    .describe('Summary of reviews for top products'),
});
export type AIProductRecommendationInput = z.infer<typeof AIProductRecommendationInputSchema>;

const AIProductRecommendationOutputSchema = z.object({
  recommendation: z
    .string()
    .describe('The personalized facial mask recommendation based on user input.'),
  reason: z.string().describe('The reason for the recommendation.'),
});
export type AIProductRecommendationOutput = z.infer<typeof AIProductRecommendationOutputSchema>;

export async function getPersonalizedRecommendations(
  input: AIProductRecommendationInput
): Promise<AIProductRecommendationOutput> {
  return aiProductRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProductRecommendationPrompt',
  input: {
    schema: AIProductRecommendationInputSchema,
  },
  output: {
    schema: AIProductRecommendationOutputSchema,
  },
  prompt: `Based on the user's skin type ({{{skinType}}}), preferences ({{{preferences}}}), and the following summary of recent product reviews ({{{reviewSummary}}}), recommend a specific facial mask product and explain why it is a good fit:\n\nRecommendation:`,
});

const aiProductRecommendationFlow = ai.defineFlow(
  {
    name: 'aiProductRecommendationFlow',
    inputSchema: AIProductRecommendationInputSchema,
    outputSchema: AIProductRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
