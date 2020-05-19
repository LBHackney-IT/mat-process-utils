import { NextRouter } from "next/router";
import { getProcessRef } from "./getProcessRef";

export const unprefixUrl = (
  router: NextRouter,
  url: { pathname: string; query?: { [s: string]: string } },
  basePath: string,
  removeProcessRef = true
): { pathname: string; query?: { [s: string]: string } } => {
  let pathname = url.pathname.replace(new RegExp(`^${basePath}`), "");

  if (removeProcessRef) {
    const processRef = getProcessRef(router);

    if (processRef && pathname.startsWith(`/${processRef}`)) {
      pathname = pathname.replace(`/${processRef}`, "");
    }
  }

  return { ...url, pathname };
};
