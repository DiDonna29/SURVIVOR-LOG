'use server';
/**
 * @fileOverview An AI agent that generates a tailored list of potential scavenging items
 * based on a user-inputted urban zone, helping survivors plan expeditions efficiently.
 *
 * - aiScavengeListGenerator - A function that handles the scavenging list generation process.
 * - AiScavengeListGeneratorInput - The input type for the aiScavengeListGenerator function.
 * - AiScavengeListGeneratorOutput - The return type for the aiScavengeListGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiScavengeListGeneratorInputSchema = z.object({
  urbanZone: z
    .string()
    .describe('A description of the urban zone to scavenge (e.g., "abandoned supermarket in downtown", "suburban housing district", "police station").'),
});
export type AiScavengeListGeneratorInput = z.infer<typeof AiScavengeListGeneratorInputSchema>;

const AiScavengeListGeneratorOutputSchema = z.object({
  scavengeList: z
    .array(z.string())
    .describe('A tailored list of potential scavenging items relevant to the specified urban zone.'),
  notes: z
    .string()
    .optional()
    .describe('Any additional notes or warnings about the scavenging location.'),
});
export type AiScavengeListGeneratorOutput = z.infer<typeof AiScavengeListGeneratorOutputSchema>;

export async function aiScavengeListGenerator(
  input: AiScavengeListGeneratorInput
): Promise<AiScavengeListGeneratorOutput> {
  return aiScavengeListGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiScavengeListGeneratorPrompt',
  input: {schema: AiScavengeListGeneratorInputSchema},
  output: {schema: AiScavengeListGeneratorOutputSchema},
  prompt: `You are an expert scout in a post-apocalyptic world, specializing in identifying valuable scavenging opportunities.
Your task is to generate a tailored list of potential scavenging items for a given urban zone.
Focus on items that would be truly useful for survival.

Urban Zone: {{{urbanZone}}}

Based on the urban zone described, provide a list of 5-10 specific items that a survivor would likely find and could use. Also, include any relevant notes or warnings about the location, if applicable.`, 
});

const aiScavengeListGeneratorFlow = ai.defineFlow(
  {
    name: 'aiScavengeListGeneratorFlow',
    inputSchema: AiScavengeListGeneratorInputSchema,
    outputSchema: AiScavengeListGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
