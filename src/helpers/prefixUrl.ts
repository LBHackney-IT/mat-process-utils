import { NextRouter } from "next/router";
import { getProcessRef } from "./getProcessRef";
import { ParsedUrl } from "./ParsedUrl";

export const prefixUrl = (
  router: NextRouter,
  basePath: string,
  url: ParsedUrl,
  addProcessRef = true
): ParsedUrl => {
  let pathname = url.pathname.replace(new RegExp(`^${basePath}`), "");

  if (addProcessRef) {
    const processRef = getProcessRef(router);

    if (processRef && !pathname.startsWith(`/${processRef}`)) {
      pathname = `/${processRef}${pathname}`;
    }
  }

  pathname = `${basePath}${pathname}`;

  return { ...url, pathname };
};
