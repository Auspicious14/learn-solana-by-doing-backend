import { Request } from "express"

export interface SolanaRequest extends Request {
  body: {
    publicKey: string;
  };
}

