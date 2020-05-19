import { NextRouter } from "next/router";
import { unprefixUrl } from "./unprefixUrl";

export const getIdFromSlug = (
  router: NextRouter,
  slug: string | string[] | undefined,
  basePath: string
): string | undefined => {
  if (!slug || typeof slug === "string") {
    return;
  }

  const slugParts = unprefixUrl(
    router,
    { pathname: `/${slug.join("/")}` },
    basePath
  )
    .pathname.split("/")
    .slice(1);

  if (slugParts.length < 2) {
    return;
  }

  return slugParts[slugParts.length - 1];
};
