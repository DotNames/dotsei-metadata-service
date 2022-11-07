import { DEFAULT_CHAIN_ID } from "./../configs/index";
import { ethers } from "ethers";
import RPC from "../configs/rpc";

export const rpcProvider = (chainId = DEFAULT_CHAIN_ID) => {
  return new ethers.providers.JsonRpcProvider(RPC[chainId]);
};
export default null;
