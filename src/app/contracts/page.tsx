"use client";

import { useState } from "react";
import { ContractSelector } from "@/components/contract/ContractSelector";
import { DynamicForm } from "@/components/contract/DynamicForm";
import { ContractPreview } from "@/components/contract/ContractPreview";
import { useContractGeneration } from "@/hooks/useContractGeneration";
import { ContractType } from "@/types/contract";
import { getContractTemplate } from "@/lib/contracts/templates";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type Step = "select" | "form" | "preview";

export default function ContractsPage() {
  const [currentStep, setCurrentStep] = useState<Step>("select");
  const [selectedType, setSelectedType] = useState<ContractType | null>(null);

  const {
    generateContract,
    downloadContractPDF,
    downloadContractDOCX,
    uploadContractFiles,
    isLoading,
    isGeneratingPDF,
    isGeneratingDOCX,
    error,
    contractText,
    isUploading,
  } = useContractGeneration();

  const handleTypeSelect = (type: ContractType) => {
    setSelectedType(type);
    setCurrentStep("form");
  };

  const handleFormSubmit = async (data: any) => {
    if (!selectedType) return;

    await generateContract(selectedType, data);
    setCurrentStep("preview");
  };

  const handleBack = () => {
    if (currentStep === "form") {
      setCurrentStep("select");
      setSelectedType(null);
    } else if (currentStep === "preview") {
      setCurrentStep("form");
    }
  };

  const handleDownloadPDF = async () => {
    if (!contractText || !selectedType) return;

    const template = getContractTemplate(selectedType);
    const contractName = template?.name || "Contrato";

    await downloadContractPDF(contractText, contractName);
  };

  const handleUpload = async () => {
    if (!contractText || !selectedType) return;

    const template = getContractTemplate(selectedType);
    const contractName = template?.name || "Contrato";

    await uploadContractFiles(contractText, contractName);
  };

  const handleDownloadDOCX = async () => {
    if (!contractText || !selectedType) return;

    const template = getContractTemplate(selectedType);
    const contractName = template?.name || "Contrato";

    await downloadContractDOCX(contractText, contractName);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {currentStep === "select" && (
        <ContractSelector
          onSelect={handleTypeSelect}
          selectedType={selectedType || undefined}
        />
      )}

      {currentStep === "form" && selectedType && (
        <DynamicForm
          contractType={selectedType}
          onSubmit={handleFormSubmit}
          onBack={handleBack}
          isLoading={isLoading}
        />
      )}

      {currentStep === "preview" && contractText && selectedType && (
        <ContractPreview
          contractText={contractText}
          contractType={getContractTemplate(selectedType)?.name || "Contrato"}
          onBack={handleBack}
          onDownloadPDF={handleDownloadPDF}
          onDownloadDOCX={handleDownloadDOCX}
          onUpload={handleUpload}
          isGeneratingPDF={isGeneratingPDF}
          isGeneratingDOCX={isGeneratingDOCX}
          isUploading={isUploading}
        />
      )}
    </div>
  );
}
