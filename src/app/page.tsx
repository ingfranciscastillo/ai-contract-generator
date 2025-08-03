import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Zap, Shield, Download } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Genera Contratos Legales
          <span className="text-primary block">
            con Inteligencia Artificial
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Crea contratos profesionales en minutos. Nuestra IA genera documentos
          legales estructurados y listos para usar, adaptados a la legislación
          dominicana.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/contracts">
              <FileText className="mr-2 h-5 w-5" />
              Generar Contrato
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            Ver Ejemplos
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardHeader>
            <Zap className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Rápido</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Genera contratos completos en menos de 2 minutos
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Seguro</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Cumple con la legislación dominicana y mejores prácticas legales
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Personalizable</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Adapta cada contrato a tus necesidades específicas
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Download className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Descargable</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Descarga en PDF o guarda en la nube para acceso posterior
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Contract Types */}
      <div className="text-center space-y-8">
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
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">🏠</div>
              <CardTitle>Arrendamiento</CardTitle>
              <CardDescription>
                Contratos para alquiler de propiedades residenciales y
                comerciales
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">💰</div>
              <CardTitle>Compraventa</CardTitle>
              <CardDescription>
                Contratos para la venta de bienes muebles e inmuebles
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">🔐</div>
              <CardTitle>Confidencialidad</CardTitle>
              <CardDescription>
                Acuerdos NDA para proteger información sensible
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Button size="lg" asChild>
          <Link href="/contracts">Comenzar Ahora</Link>
        </Button>
      </div>
    </div>
  );
}
