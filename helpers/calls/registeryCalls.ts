import { Contract } from "@ethersproject/contracts";

import { DEFAULT_DOMAIN_EXTENSION } from "../../configs";
import { getResolverAddress } from "../addressHelpers";

const { getCosmWasmClient } = require("@sei-js/core");
const { getRegistryAddress } = require("@dotnames/dotseijs");
const { default: DotSei } = require("@dotnames/dotseijs");

export const getDomainData = async (label: string) => {
  try {
    // const namehashLabel = namehash(label);
    const namehashLabel = label;
    // const txData = await registryContract.labelSearch(
    //   namehashLabel?.toLowerCase()
    // );
    // const [isRegistered, owner, resolver] = txData;
    // const parsedData = {
    //   isRegistered,
    //   owner,
    //   resolver,
    //   name: label?.toLowerCase(),
    // };
    // if (!isRegistered) {
    //   throw {
    //     message:
    //       "Domain not registered. Please register the domain to continue.",
    //     code: 404,
    //   };
    // }
    // return parsedData;

    const client = await getCosmWasmClient("https://sei-rpc.polkachu.com/");
    const dotSei = new DotSei({
      client,
      networkId: "pacific-1",
      dotSeiAddr: getRegistryAddress("pacific-1"), //optional
    });

    const owner = await dotSei.name(namehashLabel + ".sei").getOwner();
    const resolver = await dotSei.name(namehashLabel + ".sei").getResolver();
    const address = await dotSei.name(namehashLabel + ".sei").getAddress();
    const avatar = await dotSei.name(namehashLabel + ".sei").getAvatar();

    const parsedData = {
      isRegistered: true,
      owner,
      resolver,
      name: label?.toLowerCase(),
    };

    if (!owner) {
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
