import { DEFAULT_CHAIN_ID } from "./../../../configs/index";
import { getRegistryContract } from "./../../../helpers/contractHelpers";
import { return_url, parseDomainNameWithSei } from "../../../utils/utils";
import { createReferralSvg } from "../../../utils/createSvgReferral";
import { NextApiRequest, NextApiResponse } from "next";
import { getDomainData } from "../../../helpers/calls/registeryCalls";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _domainName = "" } = req.query;

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
      name: parsedDomainNameNoExt,
      description: `Web3 domains natively on Sei Layer 1 blockchain. Currently live on Sei Mainnet. Powered by Sei token.


Visit www.dotsei.me now to claim a domain for yourself.`,
      domainName: _domainName,
      externalUrl: `https://dotsei.me/name/${_domainName}`,
      nftUrl: `${host}/api/nft/${_domainName}`,
      referralUrl: `https://dotsei.me?referral=${parsedDomainNameNoExt}`,
      refrralPreviewUrl: `${host}/api/nft/referral/${_domainName}`,
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
      ],
    });
  } catch (error) {
    res.send({ error, _domainName });
  }
};
