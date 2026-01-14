import { NextRequest, NextResponse } from "next/server";
import { generateContract } from "@/lib/ai/groq";
import { getContractSchema } from "@/lib/contracts/schemas";
import { ContractType } from "@/types/contract";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Validar que el tipo de contrato sea válido
    if (!Object.values(ContractType).includes(type)) {
      return NextResponse.json(
        { success: false, error: "Tipo de contrato inválido" },
        { status: 400 }
      );
    }

    // Validar los datos usando el schema correspondiente
    const schema = getContractSchema(type);
    const validationResult = schema.safeParse({ type, ...data });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Datos inválidos",
          details: validationResult.error.message,
        },
        { status: 400 }
      );
    }

    // Generar el contrato usando Groq (AI SDK)
    const contractText = await generateContract({ type, data });

    return NextResponse.json({
      success: true,
      contract: contractText,
    });
  } catch (error) {
    console.error("Error in contract generation API:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}
