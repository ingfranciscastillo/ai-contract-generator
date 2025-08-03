export enum ContractType {
  RENTAL = "rental",
  PURCHASE = "purchase",
  NDA = "nda",
  SERVICE = "service",
  EMPLOYMENT = "employment",
  LOAN = "loan",
}

export interface ContractTemplate {
  id: ContractType;
  name: string;
  description: string;
  icon: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  name: string;
  type: "text" | "email" | "number" | "date" | "select" | "textarea";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: any;
}

export interface ContractData {
  type: ContractType;
  formData: Record<string, any>;
  generatedText: string;
  createdAt: Date;
  id: string;
}

export interface GenerateContractRequest {
  type: ContractType;
  data: Record<string, any>;
}

export interface GenerateContractResponse {
  success: boolean;
  contract?: string;
  error?: string;
}
