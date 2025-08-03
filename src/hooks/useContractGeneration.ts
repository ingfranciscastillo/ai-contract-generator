"use client";

import { useState } from "react";
import { ContractType } from "@/types/contract";
import { generateContractPDF, downloadPDF } from "@/lib/pdf/generator";

interface UseContractGenerationReturn {
  generateContract: (
    type: ContractType,
    data: Record<string, any>
  ) => Promise<void>;
  downloadContractPDF: (
    contractText: string,
    contractType: string
  ) => Promise<void>;
  isLoading: boolean;
  isGeneratingPDF: boolean;
  error: string | null;
  contractText: string | null;
}

export function useContractGeneration(): UseContractGenerationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contractText, setContractText] = useState<string | null>(null);

  const generateContract = async (
    type: ContractType,
    data: Record<string, any>
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contracts/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, data }),
      });

      if (!response.ok) {
        throw new Error("Error al generar el contrato");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Error desconocido");
      }

      setContractText(result.contract);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadContractPDF = async (
    contractText: string,
    contractType: string
  ) => {
    setIsGeneratingPDF(true);
    setError(null);

    try {
      const pdfBytes = await generateContractPDF({
        title: contractType,
        content: contractText,
        footer: `Generado el ${new Date().toLocaleDateString("es-DO")}`,
      });

      const filename = `${contractType.replace(/\s+/g, "_")}_${Date.now()}.pdf`;
      downloadPDF(pdfBytes, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al generar PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return {
    generateContract,
    downloadContractPDF,
    isLoading,
    isGeneratingPDF,
    error,
    contractText,
  };
}
