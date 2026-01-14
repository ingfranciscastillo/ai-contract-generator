import { Document, Packer, Paragraph, TextRun } from "docx";

function stripMarkdown(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1");
}

export async function generateContractDOCX(options: {
  title: string;
  content: string;
}): Promise<Blob> {
  const plain = stripMarkdown(options.content);
  const lines = plain.split(/\r?\n/);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: options.title, bold: true, size: 32 })],
            spacing: { after: 300 },
          }),
          ...lines.map(
            (line) =>
              new Paragraph({
                children: [new TextRun({ text: line || " " })],
              })
          ),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}

export function downloadDOCX(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


