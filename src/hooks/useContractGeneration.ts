"use client";

import { useState } from "react";
import { ContractType } from "@/types/contract";
import { generateContractPDF, downloadPDF } from "@/lib/pdf/generator";
import { generateContractDOCX, downloadDOCX } from "@/lib/docx/generator";

interface UseContractGenerationReturn {
  generateContract: (
    type: ContractType,
    data: Record<string, unknown>
  ) => Promise<void>;
  downloadContractPDF: (
    contractText: string,
    contractType: string
  ) => Promise<void>;
  downloadContractDOCX: (
    contractText: string,
    contractType: string
  ) => Promise<void>;
  uploadContractFiles: (
    contractText: string,
    contractType: string
  ) => Promise<void>;
  isLoading: boolean;
  isGeneratingPDF: boolean;
  isGeneratingDOCX: boolean;
  isUploading: boolean;
  error: string | null;
  contractText: string | null;
}

export function useContractGeneration(): UseContractGenerationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingDOCX, setIsGeneratingDOCX] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contractText, setContractText] = useState<string | null>(null);

  const generateContract = async (
    type: ContractType,
    data: Record<string, unknown>
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

  const downloadContractDOCX = async (
    contractText: string,
    contractType: string
  ) => {
    setIsGeneratingDOCX(true);
    setError(null);

    try {
      const blob = await generateContractDOCX({
        title: contractType,
        content: contractText,
      });

      const filename = `${contractType.replace(/\s+/g, "_")}_${Date.now()}.docx`;
      downloadDOCX(blob, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al generar DOCX");
    } finally {
      setIsGeneratingDOCX(false);
    }
  };

  const uploadContractFiles = async (contractText: string, contractType: string) => {
    setIsUploading(true);
    setError(null);

    try {
      const ts = Date.now();
      const contractId = `contract_${ts}`;

      const uploadRes = await fetch("/api/r2/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractType,
          contractId,
          contractText,
        }),
      });

      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok || !uploadJson.success) {
        throw new Error(uploadJson.error || "No se pudo guardar el contrato");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir el contrato");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    generateContract,
    downloadContractPDF,
    downloadContractDOCX,
    uploadContractFiles,
    isLoading,
    isGeneratingPDF,
    isGeneratingDOCX,
    isUploading,
    error,
    contractText,
  };
}
