import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CONTRACT_TYPES = [
  {
    emoji: "🏠",
    title: "Arrendamiento",
    description:
      "Contratos para alquiler de propiedades residenciales y comerciales",
  },
  {
    emoji: "💰",
    title: "Compraventa",
    description: "Contratos para la venta de bienes muebles e inmuebles",
  },
  {
    emoji: "🔐",
    title: "Confidencialidad",
    description: "Acuerdos NDA para proteger información sensible",
  },
];

export default function ContractTypesSection() {
  return (
    <section className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Tipos de Contratos Disponibles
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Nuestra plataforma soporta los tipos de contratos más comunes para
          empresas y particulares
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CONTRACT_TYPES.map(({ emoji, title, description }) => (
          <Card key={title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">{emoji}</div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Button size="lg" asChild>
        <Link href="/contracts">Comenzar Ahora</Link>
      </Button>
    </section>
  );
}
