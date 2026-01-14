import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Zap, Shield, Download } from "lucide-react";

const FEATURES = [
  {
    title: "Rápido",
    description: "Genera contratos completos en menos de 2 minutos",
    icon: Zap,
  },
  {
    title: "Seguro",
    description:
      "Cumple con la legislación dominicana y mejores prácticas legales",
    icon: Shield,
  },
  {
    title: "Personalizable",
    description: "Adapta cada contrato a tus necesidades específicas",
    icon: FileText,
  },
  {
    title: "Descargable",
    description: "Descarga en PDF o guarda en la nube para acceso posterior",
    icon: Download,
  },
];

export default function FeaturesSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {FEATURES.map(({ title, description, icon: Icon }) => (
        <Card key={title}>
          <CardHeader>
            <Icon className="h-10 w-10 text-primary mb-2" />
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
