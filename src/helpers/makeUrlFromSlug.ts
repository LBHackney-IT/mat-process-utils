import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { ParsedUrl } from "./ParsedUrl";
import { prefixUrl } from "./prefixUrl";

export const makeUrlFromSlug = <Slug extends string>(
  router: NextRouter,
  slug: Slug,
  basePath: string,
  query?: ParsedUrlQuery
): ParsedUrl => prefixUrl(router, basePath, { pathname: `/${slug}`, query });
