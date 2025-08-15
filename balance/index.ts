import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { solanaConnection } from "../config/connection";
import { PublicKey } from "@solana/web3.js";

export const getBalance = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const publickKey = req.body.publickKey;
    const connection = solanaConnection();

    const balance = connection.getBalance(publickKey as PublicKey);
    if (!balance) {
      res.json({
        success: false,
        message: "Balance not found",
      });
      return;
    }

    res.json({ success: true, data: balance });
  }
);
