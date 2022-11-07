import { return_url } from "../../../../utils/utils";
import { createReferralSvg } from "../../../../utils/createSvgReferral";

export default async (req, res) => {
  const { _nftId = null } = req.query;
  const host = return_url(req);

  console.log({
    host,
    query: req.query,
  });

  const refSvg = createReferralSvg(_nftId);
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
  );
  return res.end(refSvg);
};
