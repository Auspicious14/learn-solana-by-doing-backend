import { Router } from "express";
import { solanaProxy } from "../config/proxy";
import { getBalance } from "../balance";

const router = Router();

router.post("/proxy", solanaProxy);
router.post("/get-balance", getBalance);

export default router;
