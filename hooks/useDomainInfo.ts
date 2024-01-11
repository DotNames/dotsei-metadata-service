import axios from "axios";
import keccak256 from "keccak256";
import { DEFAULT_REST_RPC_URL } from "../configs/rpc";
import { contractsV2, seiContracts } from "../configs/contracts";
const getDomainWitoutTld = (label: string) => {
  try {
    return label
      ?.split(".")
      ?.slice(0, -1)
      ?.toLocaleString()
      ?.replaceAll(",", ".");
  } catch (error) {
    console.log(`index:61 ~ error:`, error);
    return label;
  }
};

const keccak256Hash = (input: string) => {
  const inputBuffer = Buffer.from(input, "utf8");
  const data = keccak256(inputBuffer).toString("hex");
  return data;
};

export const getDomainExpiry = async (label: string) => {
  const lowercasedLabel = label?.toLowerCase();
  const labelWithoutTld = getDomainWitoutTld(lowercasedLabel);
  const nameHash = keccak256Hash(labelWithoutTld);

  try {
    const queryValue = {
      get_expires: {
        id: nameHash,
      },
    };
    var queryBase64Value = btoa(JSON.stringify(queryValue));

    const { data } = await axios.get(
      `${DEFAULT_REST_RPC_URL}/cosmwasm/wasm/v1/contract/${seiContracts.registrar}/smart/${queryBase64Value}`
    );

    if (data) {
      return data?.data;
    } else {
      throw new Error("Unable to fetch data");
    }
  } catch (error) {
    console.log(` registrarQueries32 ~ error:`, error);
    throw error;

    // return null;
  }
};

export const getNftInfo = async (tokenId: string) => {
  try {
    const queryValue = {
      nft_info: {
        token_id: tokenId,
      },
    };
    var queryBase64Value = btoa(JSON.stringify(queryValue));

    const { data } = await axios.get(
      `${DEFAULT_REST_RPC_URL}/cosmwasm/wasm/v1/contract/${seiContracts.registrar}/smart/${queryBase64Value}`
    );

    if (data) {
      return data?.data;
    } else {
      throw new Error("Unable to fetch data");
    }
  } catch (error) {
    console.log(` registrarQueries32 ~ error:`, error);
    throw error;

    // return null;
  }
};
