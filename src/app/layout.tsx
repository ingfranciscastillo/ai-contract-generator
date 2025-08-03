import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="es">
      <body className={inter.className}>
        <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">📄</span>
                </div>
                <h1 className="text-xl font-bold">Contract Generator</h1>
              </div>
              <nav className="hidden md:flex items-center space-x-4">
                <a
                  href="/contracts"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Generar Contrato
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Mis Contratos
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Ayuda
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          {children}
        </main>

        <footer className="border-t bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>© 2024 Contract Generator. Generador de contratos con IA.</p>
              <p className="mt-2">
                ⚠️ Los contratos generados deben ser revisados por un
                profesional legal antes de su uso oficial.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
