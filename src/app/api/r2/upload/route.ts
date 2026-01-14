import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client } from "@/lib/r2/client";
import { generateContractPDF } from "@/lib/pdf/generator";
import { generateContractDOCX } from "@/lib/docx/generator";
import { addContractForUser } from "@/lib/contracts/store";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
  }

  const body: unknown = await req.json();
  const obj = body as { contractType?: unknown; contractId?: unknown; contractText?: unknown };

  const contractType =
    typeof obj.contractType === "string" ? obj.contractType : "Contrato";
  const contractId =
    typeof obj.contractId === "string" ? obj.contractId : `contract_${Date.now()}`;
  const contractText =
    typeof obj.contractText === "string" ? obj.contractText : null;

  if (!contractText) {
    return NextResponse.json(
      { success: false, error: "contractText es requerido" },
      { status: 400 }
    );
  }

  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME!;
  const publicBaseUrl = process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL!;
  const client = getR2Client();

  // Generar PDFs/DOCX en el servidor
  const [pdfBytes, docxBlob] = await Promise.all([
    generateContractPDF({
      title: contractType,
      content: contractText,
      footer: `Generado el ${new Date().toLocaleDateString("es-DO")}`,
    }),
    generateContractDOCX({
      title: contractType,
      content: contractText,
    }),
  ]);

  const ts = Date.now();
  const pdfName = `${contractType}_${ts}.pdf`.replace(/[^\w.\-()+ ]/g, "_");
  const docxName = `${contractType}_${ts}.docx`.replace(/[^\w.\-()+ ]/g, "_");

  const pdfKey = `contracts/${userId}/${contractId}/${pdfName}`;
  const docxKey = `contracts/${userId}/${contractId}/${docxName}`;

  // Subir a R2 desde el servidor (sin CORS)
  await Promise.all([
    client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: pdfKey,
        Body: Buffer.from(pdfBytes),
        ContentType: "application/pdf",
      })
    ),
    (async () => {
      const arrayBuffer = await docxBlob.arrayBuffer();
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: docxKey,
          Body: Buffer.from(arrayBuffer),
          ContentType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })
      );
    })(),
  ]);

  const pdfUrl = `${publicBaseUrl.replace(/\/$/, "")}/${pdfKey}`;
  const docxUrl = `${publicBaseUrl.replace(/\/$/, "")}/${docxKey}`;

  const saved = await addContractForUser({
    userId,
    contractType,
    contractId,
    files: [
      {
        key: pdfKey,
        url: pdfUrl,
        name: pdfName,
        type: "application/pdf",
        size: pdfBytes.length,
      },
      {
        key: docxKey,
        url: docxUrl,
        name: docxName,
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        size: 0,
      },
    ],
  });

  return NextResponse.json({
    success: true,
    contract: saved,
  });
}