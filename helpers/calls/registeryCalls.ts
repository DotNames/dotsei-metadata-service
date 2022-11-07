import { Contract } from "@ethersproject/contracts";

import { DEFAULT_DOMAIN_EXTENSION } from "../../configs";
import { getResolverAddress } from "../addressHelpers";

export const getDomainData = async (
  registryContract: Contract,
  label: string
) => {
  try {
    // const namehashLabel = namehash(label);
    const namehashLabel = label;
    const txData = await registryContract.labelSearch(
      namehashLabel?.toLowerCase()
    );
    const [isRegistered, owner, resolver] = txData;
    const parsedData = {
      isRegistered,
      owner,
      resolver,
      name: label?.toLowerCase(),
    };
    if (!isRegistered) {
      throw {
        message:
          "Domain not registered. Please register the domain to continue.",
        code: 404,
      };
    }
    return parsedData;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
