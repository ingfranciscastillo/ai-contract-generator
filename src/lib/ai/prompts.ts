import { ContractType } from "@/types/contract";

interface PromptContext {
  type: ContractType;
  data: Record<string, any>;
}

const basePrompt = `Eres un abogado experto en derecho contractual dominicano. Tu tarea es generar un contrato legal profesional, completo y bien estructurado. 

INSTRUCCIONES IMPORTANTES:
- El contrato debe estar en español y seguir la legislación dominicana
- Incluye todas las cláusulas legales necesarias
- Usa un lenguaje formal y jurídico apropiado
- Estructura el contrato con numeración clara
- Incluye espacios para firmas al final
- Asegúrate de que el contrato sea legalmente vinculante

FORMATO REQUERIDO:
- Título del contrato centrado
- Identificación de las partes
- Considerandos (CONSIDERANDO QUE...)
- Cláusulas numeradas
- Disposiciones finales
- Espacio para firmas y fecha`;

export const contractPrompts = {
  [ContractType.RENTAL]: (data: Record<string, any>) => `
${basePrompt}

TIPO DE CONTRATO: CONTRATO DE ARRENDAMIENTO

Genera un contrato de arrendamiento completo con los siguientes datos:
- Arrendador: ${data.landlordName} (Cédula: ${data.landlordId})
- Arrendatario: ${data.tenantName} (Cédula: ${data.tenantId}) 
- Propiedad: ${data.propertyAddress}
- Renta mensual: RD$${data.monthlyRent}
- Depósito: RD$${data.deposit}
- Fecha de inicio: ${data.startDate}
- Duración: ${data.duration}

El contrato debe incluir:
- Obligaciones del arrendador y arrendatario
- Condiciones de pago
- Mantenimiento y reparaciones
- Causales de terminación
- Cláusulas sobre servicios públicos
- Renovación automática si aplica
- Penalidades por incumplimiento
`,

  [ContractType.PURCHASE]: (data: Record<string, any>) => `
${basePrompt}

TIPO DE CONTRATO: CONTRATO DE COMPRAVENTA

Genera un contrato de compraventa completo con los siguientes datos:
- Vendedor: ${data.sellerName} (Cédula: ${data.sellerId})
- Comprador: ${data.buyerName} (Cédula: ${data.buyerId})
- Bien objeto de venta: ${data.itemDescription}
- Precio de venta: RD$${data.salePrice}
- Forma de pago: ${data.paymentMethod}

El contrato debe incluir:
- Declaraciones de las partes
- Objeto y precio de la venta
- Condiciones de pago
- Entrega del bien
- Garantías y vicios ocultos
- Transferencia de propiedad
- Gastos e impuestos
- Resolución de conflictos
`,

  [ContractType.NDA]: (data: Record<string, any>) => `
${basePrompt}

TIPO DE CONTRATO: ACUERDO DE CONFIDENCIALIDAD (NDA)

Genera un acuerdo de confidencialidad completo con los siguientes datos:
- Parte que divulga: ${data.disclosingParty}
- Parte receptora: ${data.receivingParty}
- Propósito: ${data.purpose}
- Duración: ${data.duration}

El acuerdo debe incluir:
- Definición de información confidencial
- Obligaciones de confidencialidad
- Excepciones a la confidencialidad
- Duración del acuerdo
- Devolución de información
- Consecuencias del incumplimiento
- Remedios legales
- Jurisdicción aplicable
`,
};

export const generatePrompt = (context: PromptContext): string => {
  const promptGenerator = contractPrompts[context.type];
  if (!promptGenerator) {
    throw new Error(
      `No prompt generator found for contract type: ${context.type}`
    );
  }
  return promptGenerator(context.data);
};
