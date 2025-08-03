import { ContractType, ContractTemplate } from "@/types/contract";

export const contractTemplates: ContractTemplate[] = [
  {
    id: ContractType.RENTAL,
    name: "Contrato de Arrendamiento",
    description:
      "Contrato para alquiler de propiedades residenciales o comerciales",
    icon: "🏠",
    fields: [
      {
        id: "landlordName",
        name: "landlordName",
        type: "text",
        label: "Nombre del Arrendador",
        required: true,
      },
      {
        id: "landlordId",
        name: "landlordId",
        type: "text",
        label: "Cédula del Arrendador",
        required: true,
      },
      {
        id: "tenantName",
        name: "tenantName",
        type: "text",
        label: "Nombre del Arrendatario",
        required: true,
      },
      {
        id: "tenantId",
        name: "tenantId",
        type: "text",
        label: "Cédula del Arrendatario",
        required: true,
      },
      {
        id: "propertyAddress",
        name: "propertyAddress",
        type: "textarea",
        label: "Dirección de la Propiedad",
        required: true,
      },
      {
        id: "monthlyRent",
        name: "monthlyRent",
        type: "number",
        label: "Renta Mensual (RD$)",
        required: true,
      },
      {
        id: "deposit",
        name: "deposit",
        type: "number",
        label: "Depósito de Garantía (RD$)",
        required: true,
      },
      {
        id: "startDate",
        name: "startDate",
        type: "date",
        label: "Fecha de Inicio",
        required: true,
      },
      {
        id: "duration",
        name: "duration",
        type: "select",
        label: "Duración del Contrato",
        required: true,
        options: ["6 meses", "1 año", "2 años", "3 años"],
      },
    ],
  },
  {
    id: ContractType.PURCHASE,
    name: "Contrato de Compraventa",
    description: "Contrato para la venta de bienes muebles o inmuebles",
    icon: "💰",
    fields: [
      {
        id: "sellerName",
        name: "sellerName",
        type: "text",
        label: "Nombre del Vendedor",
        required: true,
      },
      {
        id: "sellerId",
        name: "sellerId",
        type: "text",
        label: "Cédula del Vendedor",
        required: true,
      },
      {
        id: "buyerName",
        name: "buyerName",
        type: "text",
        label: "Nombre del Comprador",
        required: true,
      },
      {
        id: "buyerId",
        name: "buyerId",
        type: "text",
        label: "Cédula del Comprador",
        required: true,
      },
      {
        id: "itemDescription",
        name: "itemDescription",
        type: "textarea",
        label: "Descripción del Bien",
        required: true,
      },
      {
        id: "salePrice",
        name: "salePrice",
        type: "number",
        label: "Precio de Venta (RD$)",
        required: true,
      },
      {
        id: "paymentMethod",
        name: "paymentMethod",
        type: "select",
        label: "Forma de Pago",
        required: true,
        options: ["Contado", "Financiado", "Mixto"],
      },
    ],
  },
  {
    id: ContractType.NDA,
    name: "Acuerdo de Confidencialidad (NDA)",
    description: "Acuerdo para proteger información confidencial",
    icon: "🔐",
    fields: [
      {
        id: "disclosingParty",
        name: "disclosingParty",
        type: "text",
        label: "Parte que Divulga",
        required: true,
      },
      {
        id: "receivingParty",
        name: "receivingParty",
        type: "text",
        label: "Parte Receptora",
        required: true,
      },
      {
        id: "purpose",
        name: "purpose",
        type: "textarea",
        label: "Propósito del Acuerdo",
        required: true,
      },
      {
        id: "duration",
        name: "duration",
        type: "select",
        label: "Duración de la Confidencialidad",
        required: true,
        options: ["1 año", "2 años", "3 años", "5 años", "Indefinido"],
      },
    ],
  },
];

export const getContractTemplate = (
  type: ContractType
): ContractTemplate | undefined => {
  return contractTemplates.find((template) => template.id === type);
};
