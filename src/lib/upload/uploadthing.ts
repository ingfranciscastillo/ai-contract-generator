import { createUploadthing, type FileRouter } from "uploadthing/next";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter para la aplicación
export const ourFileRouter = {
  // Endpoint para subir contratos PDF
  contractUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // Aquí puedes agregar autenticación si es necesaria
      // const user = await auth(req);
      // if (!user) throw new UploadThingError("Unauthorized");

      return { userId: "anonymous" }; // Por ahora permitimos acceso anónimo
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Contract uploaded by", metadata.userId);
      console.log("File URL", file.url);

      // Aquí puedes guardar la información del archivo en tu base de datos
      // await saveContractToDatabase({
      //   url: file.url,
      //   userId: metadata.userId,
      //   uploadedAt: new Date()
      // });

      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
