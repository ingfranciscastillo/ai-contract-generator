import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getR2Client } from "@/lib/r2/client";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const contractType =
    typeof body?.contractType === "string" ? body.contractType : "Contrato";
  const contractId =
    typeof body?.contractId === "string" ? body.contractId : `contract_${Date.now()}`;

  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME!;
  const publicBaseUrl = process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL!;
  const client = getR2Client();

  const files = Array.isArray(body?.files) ? body.files : [];
  if (files.length === 0) {
    return NextResponse.json({ success: false, error: "Archivos requeridos" }, { status: 400 });
  }

  const presigned = await Promise.all(
    files.map(async (f) => {
      const name = typeof f?.name === "string" ? f.name : "archivo";
      const type = typeof f?.type === "string" ? f.type : "application/octet-stream";
      const size = typeof f?.size === "number" ? f.size : 0;

      const safeName = name.replace(/[^\w.\-()+ ]/g, "_");
      const key = `contracts/${userId}/${contractId}/${safeName}`;

      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: type,
      });

      const uploadUrl = await getSignedUrl(client, command, { expiresIn: 60 * 5 });
      const fileUrl = `${publicBaseUrl.replace(/\/$/, "")}/${key}`;

      return { key, uploadUrl, fileUrl, name, type, size };
    })
  );

  return NextResponse.json({
    success: true,
    contractType,
    contractId,
    presigned,
  });
}


