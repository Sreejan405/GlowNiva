'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing a personalized skincare routine recommendation.
 *
 * The flow takes user preferences, skin type, and a list of available products to suggest a full routine.
 * It exports:
 * - `getPersonalizedRecommendations`: An async function that triggers the flow.
 * - `AIProductRecommendationInput`: The input type for the flow.
 * - `AIProductRecommendationOutput`: The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  skinTypes: z.array(z.string()),
  tags: z.array(z.string()),
  benefits: z.array(z.string()),
});

const AIProductRecommendationInputSchema = z.object({
  skinType: z
    .string()
    .describe("The user's skin type (e.g., oily, dry, sensitive, combination)."),
  preferences: z
    .string()
    .describe("The user's main skin concern (e.g., acne, dullness, aging)."),
  availableProducts: z.array(ProductSchema).describe('A list of available products to choose from.'),
});
export type AIProductRecommendationInput = z.infer<typeof AIProductRecommendationInputSchema>;

const RecommendedProductSchema = z.object({
    productName: z.string().describe('The name of the recommended product.'),
    reason: z.string().describe('A brief explanation of why this product was recommended for the user.'),
});

const AIProductRecommendationOutputSchema = z.object({
  cleanser: RecommendedProductSchema.optional().describe('Recommendation for a facial cleanser.'),
  serum: RecommendedProductSchema.optional().describe('Recommendation for a serum.'),
  moisturizer: RecommendedProductSchema.optional().describe('Recommendation for a moisturizer.'),
  mask: RecommendedProductSchema.optional().describe('Recommendation for a facial mask.'),
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
  prompt: `You are a skincare expert for GlowNiva Cosmetics. Your goal is to create a personalized skincare routine (cleanser, serum, moisturizer, and mask) for a user.

User's Skin Type: {{{skinType}}}
User's Main Concern: {{{preferences}}}

Here is a list of available products:
{{#each availableProducts}}
- Product: {{title}}
  - Description: {{description}}
  - Good for skin types: {{#each skinTypes}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  - Addresses concerns like: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  - Benefits: {{#each benefits}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

Based on the user's skin type and concern, select the best product from the list for each category (cleanser, serum, moisturizer, mask) to build a complete routine. If no suitable product is found for a category, you can omit it. For each product you recommend, provide the product name and a short reason why it's a good fit for the user.`,
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