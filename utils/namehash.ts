import { normalize } from "@ensdomains/eth-ens-namehash";

export function namehash(inputName: any) {
  try {
    const normalisedLabel = normalize(inputName);

    return normalisedLabel;
  } catch (error) {
    return null;
  }
}
