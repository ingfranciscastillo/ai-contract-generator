import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export interface PDFOptions {
  title: string;
  content: string;
  footer?: string;
}

export async function generateContractPDF({
  title,
  content,
  footer,
}: PDFOptions): Promise<Uint8Array> {
  try {
    // Crear nuevo documento PDF
    const pdfDoc = await PDFDocument.create();

    // Configurar fuentes
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Configuraciones de página
    const pageWidth = 595.28; // A4
    const pageHeight = 841.89;
    const margin = 50;
    const contentWidth = pageWidth - margin * 2;

    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let yPosition = pageHeight - margin;

    // Título
    const titleHeight = 20;
    page.drawText(title, {
      x: margin,
      y: yPosition,
      size: titleHeight,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= titleHeight + 20;

    // Dividir contenido en líneas
    const lines = content.split("\n");
    const fontSize = 11;
    const lineHeight = fontSize * 1.4;

    for (const line of lines) {
      // Si la línea es muy larga, dividirla
      const words = line.split(" ");
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine + (currentLine ? " " : "") + word;
        const textWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (textWidth > contentWidth && currentLine) {
          // Dibujar línea actual
          page.drawText(currentLine, {
            x: margin,
            y: yPosition,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
          yPosition -= lineHeight;
          currentLine = word;

          // Verificar si necesitamos nueva página
          if (yPosition < margin + 50) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            yPosition = pageHeight - margin;
          }
        } else {
          currentLine = testLine;
        }
      }

      // Dibujar última línea
      if (currentLine) {
        page.drawText(currentLine, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
        yPosition -= lineHeight;
      }

      // Línea vacía para párrafos
      if (line === "") {
        yPosition -= lineHeight / 2;
      }

      // Verificar si necesitamos nueva página
      if (yPosition < margin + 50) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }
    }

    // Footer si se proporciona
    if (footer) {
      const pages = pdfDoc.getPages();
      pages.forEach((page, index) => {
        page.drawText(`${footer} - Página ${index + 1} de ${pages.length}`, {
          x: margin,
          y: 30,
          size: 8,
          font: font,
          color: rgb(0.5, 0.5, 0.5),
        });
      });
    }

    // Serializar PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
}

export function downloadPDF(pdfBytes: Uint8Array, filename: string): void {
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
