import { DEFAULT_CHAIN_ID } from "./../../../configs/index";
import { getRegistryContract } from "./../../../helpers/contractHelpers";
import { return_url, parseDomainNameWithSei } from "../../../utils/utils";
import { createReferralSvg } from "../../../utils/createSvgReferral";
import { NextApiRequest, NextApiResponse } from "next";
import { getDomainData } from "../../../helpers/calls/registeryCalls";
import { getDomainExpiry } from "../../../hooks/useDomainInfo";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _domainName = "" } = req.query;
  async function expiryDate() {
    const expiry = await getDomainExpiry(_domainName);

    let normalDate = new Date(expiry.expires * 1000);
    const date = normalDate.getDate();
    const month = normalDate.getMonth() + 1;
    const year = normalDate.getFullYear();
    return `${date}/${month}/${year}`;
  }
  // TODO : Dynamic Chain Id through req query
  // const chainId = DEFAULT_CHAIN_ID;
  const host = return_url(req);
  // const registeryContract = getRegistryContract(chainId);
  const parsedDomainNameNoExt = parseDomainNameWithSei(_domainName);

  function domainTrait(domain: string) {
    switch (domain.length) {
      case 3:
        return "Premium";
      case 4:
        return "Rare";
      default:
        return "Standard";
    }
  }

  if (!parsedDomainNameNoExt) {
    return res
      .status(404)
      .json({ message: "Invalid Domain | Label shoud have extension of .sei" });
  }
  try {
    const domainData = await getDomainData(parsedDomainNameNoExt);
    res.send({
      ...domainData,
      name: _domainName,
      description: `Web3 domains natively on Sei Layer 1 blockchain. Currently live on Sei Mainnet. Powered by Sei token.


Visit www.dotsei.me now to claim a domain for yourself.`,
      externalUrl: `https://dotsei.me/name/${_domainName}`,
      image: `${host}/api/image/${_domainName}`,
      attributes: [
        {
          trait_type: "domain",
          value: _domainName,
        },
        {
          trait_type: "level",
          value: 2,
        },
        {
          trait_type: "length",
          value: parsedDomainNameNoExt.length,
        },
        {
          trait_type: "type",
          value: domainTrait(parsedDomainNameNoExt),
        },
        {
          trait_type: "registration date",
          value: "",
        },
        {
          trait_type: "expiry date",
          value: await expiryDate(),
        },
      ],
    });
  } catch (error) {
    res.send({ error, _domainName });
  }
};
