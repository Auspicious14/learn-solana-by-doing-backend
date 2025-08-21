import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { PublicKey } from "@solana/web3.js";
import { publicKey as umiPublicKey } from "@metaplex-foundation/umi";
import { solanaConnection } from "../config/connection";
import { metaplexConnection } from "../config/metaplex";
import { SolanaRequest } from "../types/index";
import { isValidPublicKey } from "../helper"

interface NFTResponse {
  success: boolean;
  message: string;
  data?: any[];
  count?: number;
}


export const getNFTsByOwner = expressAsyncHandler(
  async (req: SolanaRequest & { query: { page?: string; limit?: string } }, res: Response<NFTResponse>) => {
    try {
      const { publicKey: publicKeyString } = req.body;
      const page = parseInt(req.query.page || "1");
      const limit = Math.min(parseInt(req.query.limit || "50"), 100); // Cap at 100

      if (!publicKeyString || !isValidPublicKey(publicKeyString)) {
        return res.status(400).json({
          success: false,
          message: "Valid public key is required",
        });
      }

      const umi = metaplexConnection();
      const umiOwnerKey = umiPublicKey(publicKeyString);

      const assetsResponse = await umi.rpc.getAssetsByOwner({
        owner: umiOwnerKey,
        interface: "MplCoreAsset",
        displayOptions: {
          showCollectionMetadata: true,
          showFungible: false,
        },
        page,
        limit,
      });

      if (!assetsResponse.items?.length) {
        return res.status(200).json({
          success: true,
          message: "No NFTs found",
          data: [],
          count: 0,
        });
      }

      const nftData = assetsResponse.items.map((asset) => ({
        id: asset.id,
        name: asset.content?.metadata?.name || "Unnamed NFT",
        symbol: asset.content?.metadata?.symbol || "",
        description: asset.content?.metadata?.description || "",
        image: asset.content?.files?.[0]?.uri || asset.content?.metadata?.image,
        collection: asset.grouping?.find((g) => g.group_key === "collection")?.group_value,
        attributes: asset.content?.metadata?.attributes || [],
        uri: asset.content?.json_uri,
        creators: asset.creators || [],
        royalty: asset.royalty,
        ownership: asset.ownership,
        supply: asset.supply,
      }));

      return res.status(200).json({
        success: true,
        message: `Page ${page} of NFTs retrieved`,
        data: nftData,
        count: nftData.length,
      });

    } catch (error) {
      console.error("Pagination error:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching paginated NFTs",
      });
    }
  }
);
