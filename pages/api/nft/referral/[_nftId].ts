import sharp from "sharp";
import { NextApiRequest, NextApiResponse } from "next";
import { parseDomainNameWithShm, return_url } from "../../../../utils/utils";
import { createReferralSvg } from "../../../../utils/createSvgReferral";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _nftId = null } = req.query;
  const host = return_url(req);
  const parsedDomainNameNoExt = parseDomainNameWithShm(_nftId);
  const domainLength = parsedDomainNameNoExt ? parsedDomainNameNoExt.length : 0;

  if (!parsedDomainNameNoExt) {
    return res.status(400).json({
      message: "Invalid Domain | Label shoud have extension of .shm",
    });
  }
  const refSvg = createReferralSvg(parsedDomainNameNoExt);
  let svgBuffer = Buffer.from(refSvg);
  const image = await sharp(svgBuffer).png().toBuffer();
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/png");
  res.setHeader(
    "Cache-Control",
    "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
  );
  return res.end(image);
};
