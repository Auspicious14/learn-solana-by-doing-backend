import { Router } from "express";
import { solanaProxy } from "../config/proxy";
import { getBalance } from "../balance";
import { getNFTsByOwner } from "../nft/index";

const router = Router();

router.post("/proxy", solanaProxy);
router.post("/get-balance", getBalance);
router.post("/nfts/get-by-owner", getNFTsByOwner);

export default router;
