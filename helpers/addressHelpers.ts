import { DEFAULT_CHAIN_ID } from "./../configs/index";

import contracts from "../configs/contracts";

export const getAddress = (address: string): string => {
  return address;
};

export const getResolverAddress = (chainId: number) => {
  return getAddress(contracts.domainResolver[chainId]);
};

export const getRegistryAddress = (chainId: number) => {
  return getAddress(contracts.domainRegistry[chainId]);
};

export const getRegistrarAddress = (chainId: number) => {
  return getAddress(contracts.domainRegistrar[chainId]);
};
