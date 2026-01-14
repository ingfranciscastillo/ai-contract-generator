import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { addContractForUser, listContractsForUser } from "@/lib/contracts/store";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
  }

  const contracts = await listContractsForUser(userId);
  return NextResponse.json({ success: true, contracts });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
  }

  const body: unknown = await req.json();
  const contractType =
    typeof (body as { contractType?: unknown })?.contractType === "string"
      ? (body as { contractType: string }).contractType
      : "Contrato";
  const contractId =
    typeof (body as { contractId?: unknown })?.contractId === "string"
      ? (body as { contractId: string }).contractId
      : undefined;
  const files = Array.isArray((body as { files?: unknown })?.files)
    ? ((body as { files: unknown[] }).files as unknown[])
    : [];

  if (files.length === 0) {
    return NextResponse.json({ success: false, error: "Archivos requeridos" }, { status: 400 });
  }

  const saved = await addContractForUser({
    userId,
    contractType,
    contractId,
    files: files.map((f) => {
      const obj = f as Record<string, unknown>;
      return {
        key: String(obj.key),
        url: String(obj.url),
        name: String(obj.name),
        type: String(obj.type),
        size: Number(obj.size) || 0,
      };
    }),
  });

  return NextResponse.json({ success: true, contract: saved });
}

