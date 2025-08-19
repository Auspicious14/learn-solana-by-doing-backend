import { clusterApiUrl, Connection } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

const HELIUS_KEY = process.env.HELIUS_API_KEY;
export const HELIUS_ENDPOINT = `${process.env.HELIUS_API_ENDPOINT}?api-key=${HELIUS_KEY}`;

export const solanaConnection = () => {
  const connection = new Connection(HELIUS_ENDPOINT, "confirmed");
  if (!connection) {
    throw new Error("Failed to connect to RCP host");
  }
  return connection;
};
