import { DEFAULT_CHAIN_ID } from "./../../../configs/index";
import { getRegistryContract } from "./../../../helpers/contractHelpers";
import { return_url, parseDomainNameWithShm } from "../../../utils/utils";
import { createReferralSvg } from "../../../utils/createSvgReferral";
import { NextApiRequest, NextApiResponse } from "next";
import { getDomainData } from "../../../helpers/calls/registeryCalls";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _domainName = "" } = req.query;

  // TODO : Dynamic Chain Id through req query
  const chainId = DEFAULT_CHAIN_ID;
  const host = return_url(req);
  const registeryContract = getRegistryContract(chainId);
  const parsedDomainNameNoExt = parseDomainNameWithShm(_domainName);
  if (!parsedDomainNameNoExt) {
    return res
      .status(404)
      .json({ message: "Invalid Domain | Label shoud have extension of .shm" });
  }
  try {
    const domainData = await getDomainData(
      registeryContract,
      parsedDomainNameNoExt
    );
    res.send({
      ...domainData,
      name: parsedDomainNameNoExt,
      description: `DotShm domains is your go-to web3 identity on the Shardeum blockchain. Replace your complex blockchain addresses using DotShm and get access to thousands of web3 applications, trade your domains on secondary market & much more.


Visit www.dotshm.me now to claim a domain for yourself.`,
      domainName: _domainName,
      externalUrl: `https://dotshm.me/name/${_domainName}`,
      nftUrl: `${host}/api/nft/${_domainName}`,
      referralUrl: `https://dotshm.me?referral=${parsedDomainNameNoExt}`,
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
          value: "standard",
        },
      ],
    });
  } catch (error) {
    res.send({ error, _domainName });
  }
};
