import { NextRouter } from "next/router";
import querystring from "querystring";
import { getProcessRef } from "./getProcessRef";
import { isStep } from "./isStep";
import { ParsedUrl } from "./ParsedUrl";
import { prefixUrl } from "./prefixUrl";

export const makeNextRouterUrls = (
  router: NextRouter,
  url: string | ParsedUrl,
  basePath: string,
  stepSlugs: string[],
  repeatingStepSlugs: string[]
): {
  href: ParsedUrl;
  as: ParsedUrl;
} => {
  let href: ParsedUrl;

  if (typeof url === "string") {
    const urlComponents = url.split("?", 2);
    const pathname = urlComponents[0];
    const query = querystring.parse(urlComponents[1]);

    href = { pathname, query };
  } else {
    href = { ...url };
  }

  const as = prefixUrl(router, basePath, { ...href });

  if (isStep(router, href, basePath, stepSlugs, repeatingStepSlugs)) {
    href.pathname = "/[...slug]";
  }

  href = prefixUrl(router, basePath, href);

  const processRef = getProcessRef(router);

  if (processRef) {
    href.pathname = href.pathname.replace(processRef, "[processRef]");
  }

  return { href, as };
};
