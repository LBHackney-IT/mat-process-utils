import { NextRouter } from "next/router";
import { getProcessRef } from "./getProcessRef";
import { ParsedUrl } from "./ParsedUrl";

export const unprefixUrl = (
  router: NextRouter,
  url: ParsedUrl,
  basePath: string,
  removeProcessRef = true
): ParsedUrl => {
  let pathname = url.pathname.replace(new RegExp(`^${basePath}`), "");

  if (removeProcessRef) {
    const processRef = getProcessRef(router);

    if (processRef && pathname.startsWith(`/${processRef}`)) {
      pathname = pathname.replace(`/${processRef}`, "");
    }
  }

  return { ...url, pathname };
};
