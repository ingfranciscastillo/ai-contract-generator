import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { generatePrompt } from "./prompts";
import { ContractType } from "@/types/contract";

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
    const modelId = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    const { text } = await generateText({
      model: groq(modelId),
      temperature: 0.3,
      maxTokens: 4000,
      prompt,
    });

    return text;
  } catch (error) {
    console.error("Error generating contract with Groq:", error);
    throw new Error("No se pudo generar el contrato. Intenta de nuevo.");
  }
}


