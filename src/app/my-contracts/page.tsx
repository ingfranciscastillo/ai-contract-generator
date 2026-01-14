"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type StoredContractFile = {
  key: string;
  url: string;
  name: string;
  type: string;
  size: number;
};

type StoredContract = {
  id: string;
  userId: string;
  contractType: string;
  createdAt: string;
  files: StoredContractFile[];
};

export default function MyContractsPage() {
  const [contracts, setContracts] = useState<StoredContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/my-contracts");
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || "No se pudo cargar tus contratos");
        }
        setContracts(json.contracts || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis contratos</h1>
        <p className="text-muted-foreground mt-2">
          Accede a tus contratos guardados y descárgalos cuando quieras.
        </p>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Cargando...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && contracts.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Aún no tienes contratos guardados.
        </p>
      )}

      <div className="grid gap-4">
        {contracts.map((c) => (
          <Card key={c.id}>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">{c.contractType}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(c.createdAt).toLocaleString("es-DO")}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {c.files.map((f) => (
                <div
                  key={f.key}
                  className="flex items-center justify-between gap-4 border rounded-md p-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.type}</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href={f.url} target="_blank" rel="noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </a>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
