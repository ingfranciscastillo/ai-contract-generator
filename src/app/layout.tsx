import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Generador de Contratos IA",
  description:
    "Genera contratos legales automáticamente usando inteligencia artificial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>
          <header className="border-b bg-foreground/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <Link href={"/"} className="text-xl text-primary font-bold">
                    Pactum
                  </Link>
                </div>

                <nav className="hidden md:flex items-center space-x-4">
                  <SignedIn>
                    <Link
                      href="/contracts"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Generar Contrato
                    </Link>
                    <Link
                      href="/my-contracts"
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      Mis Contratos
                    </Link>
                  </SignedIn>
                </nav>

                <div className="flex items-center gap-3">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button size="sm">Iniciar sesión</Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton
                      appearance={{ elements: { avatarBox: "h-8 w-8" } }}
                    />
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>

          <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {children}
          </main>

          <footer className="border-t bg-white">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  &copy; {new Date().getFullYear()} Pactum. Generador de
                  contratos con IA.
                </p>
                <p className="mt-2">
                  ⚠️ Los contratos generados deben ser revisados por un
                  profesional legal antes de su uso oficial.
                </p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
