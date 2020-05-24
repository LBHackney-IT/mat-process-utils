import router from "next/router";
import { ON_SERVER } from "./environment";
import { getIdFromSlug } from "./getIdFromSlug";

export const getPathForRepeatingStep = (
  slug: string,
  basePath: string
): (() => string) => (): string => {
  if (ON_SERVER) {
    return "";
  }

  const id = getIdFromSlug(router, router.query.slug, basePath);

  if (!id) {
    return "";
  }

  return [slug, id].join("/");
};
