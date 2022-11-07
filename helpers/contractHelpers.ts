import { rpcProvider } from "./rpcProvider";
import { Contract } from "@ethersproject/contracts";
import {
  getRegistrarAddress,
  getRegistryAddress,
  getResolverAddress,
} from "./addressHelpers";
import registrarABI from "../configs/abis/DomainRegistrar.json";
import registryABI from "../configs/abis/Registry.json";
import resolverABI from "../configs/abis/Resolver.json";

export const getContract = ({
  abi,
  address,
  chainId,
}: {
  abi: any;
  address: string;
  signer?: any;
  chainId?: number;
}) => {
  const provider = rpcProvider(chainId);
  return new Contract(address, abi, provider);
};

export const getResolverContract = (chainId: number): any => {
  return getContract({
    abi: resolverABI,
    address: getResolverAddress(chainId),
    chainId,
  }) as Contract;
};

export const getRegistrarContract = (chainId: number): any => {
  return getContract({
    abi: registrarABI,
    address: getRegistrarAddress(chainId),
    chainId,
  }) as Contract;
};

export const getRegistryContract = (chainId: number): any => {
  return getContract({
    abi: registryABI,
    address: getRegistryAddress(chainId),
    chainId,
  }) as Contract;
};
