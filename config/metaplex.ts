import { publicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api"
import { HELIUS_ENDPOINT } from "./connection"

export const metaplexConnection = () => {
  const umi = createUmi(HELIUS_ENDPOINT).use(dasApi())
  return umi
}
