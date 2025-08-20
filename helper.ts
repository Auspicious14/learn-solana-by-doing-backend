import { PublicKey } from "@solana/web3.js"

export const isValidPublicKey = (key: string): boolean => {
  try {
    new PublicKey(key);
    return true;
  } catch {
    return false;
  }
};
