import { ChainId } from "./chainIds";
export const DEFAULT_REFERRER_ADDRESS =
  "0x0000000000000000000000000000000000000000";

export const EXPLORER_URL = "https://polygonscan.com";
export const DEFAULT_CHAIN_ID =  ChainId.LIBERTY15;
export const REGISTRAR_SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/dotshm/referrals-tracker";
export const DEFAULT_DOMAIN_EXTENSION = ".shm";

export const NATIVE_CURRENCY = {
  [ChainId.MATIC]: "MATIC",
  [ChainId.MATIC_TESTNET]: "MATIC",
  [ChainId.LIBERTY15]: "SHM",
  [ChainId.LIBERTY20]: "SHM",
  [ChainId.BSC_TESTNET]: "TBNB",
};
export const CHAIN_EXPLORER_URL = {
  [ChainId.MATIC]: "https://polygonscan.com",
  [ChainId.MATIC_TESTNET]: "https://mumbai.polygonscan.com",
  [ChainId.LIBERTY15]: "https://explorer.liberty10.shardeum.org",
  [ChainId.LIBERTY20]: "https://explorer.liberty20.shardeum.org",
  [ChainId.BSC_TESTNET]: "https://testnet.bscscan.com",
};
