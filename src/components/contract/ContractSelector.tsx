"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { contractTemplates } from "@/lib/contracts/templates";
import { ContractType } from "@/types/contract";

interface ContractSelectorProps {
  onSelect: (type: ContractType) => void;
  selectedType?: ContractType;
}

export function ContractSelector({
  onSelect,
  selectedType,
}: ContractSelectorProps) {
  const [hoveredCard, setHoveredCard] = useState<ContractType | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Generador de Contratos
        </h2>
        <p className="text-muted-foreground mt-2">
          Selecciona el tipo de contrato que deseas generar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contractTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedType === template.id
                ? "ring-2 ring-primary border-primary"
                : hoveredCard === template.id
                ? "border-primary/50"
                : ""
            }`}
            onClick={() => onSelect(template.id)}
            onMouseEnter={() => setHoveredCard(template.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="text-center">
              <div className="text-4xl mb-4">{template.icon}</div>
              <CardTitle className="text-xl">{template.name}</CardTitle>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Campos requeridos:{" "}
                  {template.fields.filter((f) => f.required).length}
                </p>
                <div className="flex flex-wrap gap-1">
                  {template.fields.slice(0, 3).map((field) => (
                    <span
                      key={field.id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                    >
                      {field.label}
                    </span>
                  ))}
                  {template.fields.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                      +{template.fields.length - 3} más
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedType && (
        <div className="text-center">
          <Button size="lg" className="mt-4">
            Continuar con{" "}
            {contractTemplates.find((t) => t.id === selectedType)?.name}
          </Button>
        </div>
      )}
    </div>
  );
}
