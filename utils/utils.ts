import { NextApiRequest } from "next";
export function return_url(req: NextApiRequest) {
  if (process.env.NODE_ENV === "production") {
    // if you are hosting a http website use http instead of https
    return `https://${req.rawHeaders[1]}`;
  } else {
    return `http://${req.rawHeaders[1]}`;
  }
}
export function parseDomainNameWithShm(domainName: string) {
  const domainNameSplit = domainName.split(".");
  const splitLength = domainNameSplit.length;
  if (
    domainNameSplit.length >= 2 &&
    domainNameSplit[splitLength - 1] == "shm"
  ) {
    return domainNameSplit[0];
  }
  return null;
}
