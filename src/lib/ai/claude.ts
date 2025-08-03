import Anthropic from "@anthropic-ai/sdk";
import { generatePrompt } from "./prompts";
import { ContractType } from "@/types/contract";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export interface GenerateContractParams {
  type: ContractType;
  data: Record<string, any>;
}

export async function generateContract({
  type,
  data,
}: GenerateContractParams): Promise<string> {
  try {
    const prompt = generatePrompt({ type, data });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-0",
      max_tokens: 4000,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Expected text response from Claude");
    }

    return content.text;
  } catch (error) {
    console.error("Error generating contract with Claude:", error);
    throw new Error("Failed to generate contract. Please try again.");
  }
}

export async function validateContractData(
  type: ContractType,
  data: Record<string, any>
): Promise<boolean> {
  // Aquí puedes agregar validaciones adicionales específicas para cada tipo de contrato
  // usando Claude para verificar la coherencia de los datos
  return true;
}
