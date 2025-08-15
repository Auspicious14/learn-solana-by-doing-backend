import { Request, Response } from "express";

import expressAsyncHandler from "express-async-handler";
import { HELIUS_ENDPOINT, solanaConnection } from "./connection";
import axios from "axios";

export const solanaProxy = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;

    const result = await axios(HELIUS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(body),
    });
    res.json(result.data);
  }
);
