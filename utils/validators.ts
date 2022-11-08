import { DEFAULT_CHAIN_ID } from "./../configs/index";
import { ChainId } from "./../configs/chainIds";
import { getRegistryContract } from "./../helpers/contractHelpers";
import { getDomainData } from "./../helpers/calls/registeryCalls";
import { namehash } from "./namehash";

// domainName without extension
export const validateDomainName = async (
  domainName: string,
  checkRegistration: boolean = false,
  chainId: any = DEFAULT_CHAIN_ID
) => {
  const domainLength = domainName.length;
  const nameHashValid = namehash(domainName);
  if (!checkRegistration) {
    return {
      accent:
        domainLength > 3 ? (nameHashValid ? "#444444" : "#ffcc00") : "red",
      type:
        domainLength > 3 ? (nameHashValid ? "success" : "warning") : "error",
    };
  }

  try {
    const registeryContract = getRegistryContract(chainId);

    const domainData = await getDomainData(registeryContract, domainName);

    if (domainData.isRegistered) {
      return {
        accent:
          domainLength > 3 ? (nameHashValid ? "#444444" : "yellow") : "red",
        type:
          domainLength > 3 ? (nameHashValid ? "success" : "warning") : "error",
      };
    }
  } catch (error) {
    return null;
  }
};
