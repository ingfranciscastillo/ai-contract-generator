"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  Upload,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

interface ContractPreviewProps {
  contractText: string;
  contractType: string;
  onBack: () => void;
  onDownloadPDF: () => void;
  onUpload?: () => void;
  isGeneratingPDF?: boolean;
  isUploading?: boolean;
}

export function ContractPreview({
  contractText,
  contractType,
  onBack,
  onDownloadPDF,
  onUpload,
  isGeneratingPDF = false,
  isUploading = false,
}: ContractPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying to clipboard:", err);
    }
  };

  const formatContractText = (text: string) => {
    return text.split("\n").map((line, index) => {
      if (line.trim() === "") {
        return <br key={index} />;
      }

      // Títulos (líneas que están en mayúsculas o centradas)
      if (line.trim().toUpperCase() === line.trim() && line.trim().length > 0) {
        return (
          <p key={index} className="font-bold text-center text-lg mb-4 mt-6">
            {line.trim()}
          </p>
        );
      }

      // Cláusulas numeradas
      if (/^\d+\./.test(line.trim()) || /^[A-Z]+\./.test(line.trim())) {
        return (
          <p key={index} className="font-semibold mt-4 mb-2">
            {line}
          </p>
        );
      }

      // Considerandos
      if (line.includes("CONSIDERANDO")) {
        return (
          <p key={index} className="font-semibold mb-2">
            {line}
          </p>
        );
      }

      return (
        <p key={index} className="mb-2 text-justify">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Vista Previa del Contrato</h2>
            <p className="text-muted-foreground">{contractType}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyToClipboard}>
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copiado" : "Copiar"}
          </Button>

          <Button
            variant="outline"
            onClick={onDownloadPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                Generando...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF
              </>
            )}
          </Button>

          {onUpload && (
            <Button onClick={onUpload} disabled={isUploading}>
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Guardar en la nube
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Contract Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contrato Generado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white border rounded-lg p-8 min-h-[600px] shadow-inner">
            <div className="max-w-none prose prose-sm">
              {formatContractText(contractText)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Este contrato ha sido generado automáticamente. Se recomienda revisión
          legal antes de su uso oficial.
        </p>
      </div>
    </div>
  );
}
