import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function HeroSection() {
  return (
    <section className="text-center space-y-6 mb-16">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        Genera Contratos Legales
        <span className="text-primary block">con Inteligencia Artificial</span>
      </h1>

      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Crea contratos profesionales en minutos. Nuestra IA genera documentos
        legales estructurados y listos para usar, adaptados a la legislación
        dominicana.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <SignedOut>
          <SignInButton mode="modal">
            <Button size="lg">
              <FileText className="mr-2 h-5 w-5" />
              Comenzar ahora
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Button size="lg" asChild>
            <Link href="/contracts">
              <FileText className="mr-2 h-5 w-5" />
              Comenzar ahora
            </Link>
          </Button>
        </SignedIn>
      </div>
    </section>
  );
}
