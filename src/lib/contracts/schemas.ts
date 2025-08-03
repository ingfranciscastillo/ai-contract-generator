import { z } from "zod";
import { ContractType } from "@/types/contract";

// Schema base para todos los contratos
const baseSchema = z.object({
  type: z.nativeEnum(ContractType),
});

// Schema para contrato de arrendamiento
export const rentalContractSchema = baseSchema.extend({
  landlordName: z.string().min(2, "Nombre del arrendador requerido"),
  landlordId: z.string().min(11, "Cédula válida requerida"),
  tenantName: z.string().min(2, "Nombre del arrendatario requerido"),
  tenantId: z.string().min(11, "Cédula válida requerida"),
  propertyAddress: z.string().min(10, "Dirección completa requerida"),
  monthlyRent: z.number().min(1, "Renta debe ser mayor a 0"),
  deposit: z.number().min(0, "Depósito debe ser 0 o mayor"),
  startDate: z.string().min(1, "Fecha de inicio requerida"),
  duration: z.string().min(1, "Duración requerida"),
});

// Schema para contrato de compraventa
export const purchaseContractSchema = baseSchema.extend({
  sellerName: z.string().min(2, "Nombre del vendedor requerido"),
  sellerId: z.string().min(11, "Cédula válida requerida"),
  buyerName: z.string().min(2, "Nombre del comprador requerido"),
  buyerId: z.string().min(11, "Cédula válida requerida"),
  itemDescription: z.string().min(10, "Descripción detallada requerida"),
  salePrice: z.number().min(1, "Precio debe ser mayor a 0"),
  paymentMethod: z.string().min(1, "Forma de pago requerida"),
});

// Schema para NDA
export const ndaContractSchema = baseSchema.extend({
  disclosingParty: z.string().min(2, "Parte que divulga requerida"),
  receivingParty: z.string().min(2, "Parte receptora requerida"),
  purpose: z.string().min(10, "Propósito detallado requerido"),
  duration: z.string().min(1, "Duración requerida"),
});

// Función para obtener el schema apropiado
export const getContractSchema = (type: ContractType) => {
  switch (type) {
    case ContractType.RENTAL:
      return rentalContractSchema;
    case ContractType.PURCHASE:
      return purchaseContractSchema;
    case ContractType.NDA:
      return ndaContractSchema;
    default:
      return baseSchema;
  }
};
