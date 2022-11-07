import { parseDomainNameWithShm, return_url } from "../../../utils/utils";
import { createReferralSvg } from "../../../utils/createSvgReferral";
import { NextApiRequest, NextApiResponse } from "next";
import { createSvgDomainNft } from "../../../utils/createSvgDomainNft";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _nftId = "" } = req.query;
  const host = return_url(req);

  console.log({
    host,
    query: req.query,
  });
  const parsedDomainNameNoExt = parseDomainNameWithShm(_nftId);
  if (!parsedDomainNameNoExt) {
    return res
      .status(404)
      .json({ message: "Invalid Domain | Label shoud have extension of .shm" });
  }
  try {
    const refSvg = createSvgDomainNft(parsedDomainNameNoExt + ".shm");
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
    );
    return res.end(refSvg);
  } catch (error) {
    console.log("====================================");
    console.log({ error });
    console.log("====================================");
    res.send({ error, _nftId });
  }
};
