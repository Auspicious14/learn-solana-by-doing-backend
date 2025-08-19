import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { solanaConnection } from "../config/connection";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const getBalance = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const publicKey = req.body.publicKey;
    const connection = solanaConnection();
    const address = new PublicKey(publicKey);

    if (!address || typeof address === "string") {
      res.json({
        success: false,
        message: "Invalid public key",
      });
      return;
    }

    const balance = await connection.getBalance(address);
    if (!balance) {
      res.json({
        success: false,
        message: "Balance not found",
      });
      return;
    }

    res.json({ success: true, data: Number(balance) / LAMPORTS_PER_SOL });
  }
);
