import { validateDomainName } from "./../../../utils/validators";
import { parseDomainNameWithShm, return_url } from "../../../utils/utils";
import { createReferralSvg } from "../../../utils/createSvgReferral";
import { NextApiRequest, NextApiResponse } from "next";
import { createSvgDomainNft } from "../../../utils/createSvgDomainNft";
import sharp from "sharp";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _nftId = "" } = req.query;
  const host = return_url(req);

  const parsedDomainNameNoExt = parseDomainNameWithShm(_nftId);
  const domainLength = parsedDomainNameNoExt ? parsedDomainNameNoExt.length : 0;

  if (!parsedDomainNameNoExt) {
    return res
      .status(404)
      .json({ message: "Invalid Domain | Label shoud have extension of .shm" });
  }
  try {
    const validationAccent = await validateDomainName(
      parsedDomainNameNoExt,
      true
    );

    if (validationAccent) {
      const { accent } = validationAccent;
      const refSvg = createSvgDomainNft(parsedDomainNameNoExt + ".shm", accent);
      let svgBuffer = Buffer.from(refSvg);
      const image = await sharp(svgBuffer).png().toBuffer();

      res.statusCode = 200;
      res.setHeader("Content-Type", "image/png");
      res.setHeader(
        "Cache-Control",
        "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
      );
      // res.pipe(image);
      return res.end(image);
    }
    return res.status(400).json({ error: "Invalid Domain", _nftId });
  } catch (error) {
    console.log("====================================");
    console.log({ error });
    console.log("====================================");
    res.status(400).json({ error, _nftId });
  }
};
