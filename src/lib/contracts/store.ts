import fs from "node:fs/promises";
import path from "node:path";

export type StoredContractFile = {
  key: string;
  url: string;
  name: string;
  type: string;
  size: number;
};

export type StoredContract = {
  id: string;
  userId: string;
  contractType: string;
  createdAt: string;
  files: StoredContractFile[];
};

type StoreShape = {
  contracts: StoredContract[];
};

const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(STORE_DIR, "contracts.json");

async function readStore(): Promise<StoreShape> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoreShape;
    return { contracts: parsed.contracts ?? [] };
  } catch {
    return { contracts: [] };
  }
}

async function writeStore(store: StoreShape) {
  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export async function addContractForUser(input: {
  userId: string;
  contractType: string;
  createdAt?: string;
  files: StoredContractFile[];
  contractId?: string;
}): Promise<StoredContract> {
  const store = await readStore();
  const createdAt = input.createdAt ?? new Date().toISOString();
  
  // Si se proporciona un contractId, buscar el contrato existente y agregar archivos
  if (input.contractId) {
    const existingContract = store.contracts.find(
      (c) => c.id === input.contractId && c.userId === input.userId
    );
    
    if (existingContract) {
      // Agregar archivos al contrato existente (evitar duplicados por key)
      const existingKeys = new Set(existingContract.files.map((f) => f.key));
      const newFiles = input.files.filter((f) => !existingKeys.has(f.key));
      existingContract.files.push(...newFiles);
      await writeStore(store);
      return existingContract;
    }
  }

  // Crear nuevo contrato
  const id = input.contractId || `${input.userId}_${Date.now()}`;
  const contract: StoredContract = {
    id,
    userId: input.userId,
    contractType: input.contractType,
    createdAt,
    files: input.files,
  };

  store.contracts.unshift(contract);
  await writeStore(store);
  return contract;
}

export async function listContractsForUser(userId: string): Promise<StoredContract[]> {
  const store = await readStore();
  return store.contracts.filter((c) => c.userId === userId);
}


