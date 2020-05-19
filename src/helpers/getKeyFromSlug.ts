import router from "next/router";
import { ON_SERVER } from "./environment";
import { getIdFromSlug } from "./getIdFromSlug";
import { getProcessRef } from "./getProcessRef";

export const getKeyFromSlug = (
  basePath: string,
  expectId = false
): (() => string) => (): string => {
  if (ON_SERVER) {
    return "";
  }

  // `router.query` might be an empty object when first loading a page for
  // some reason.
  const slug = router.query.slug;

  const id = getIdFromSlug(router, slug, basePath);

  if (id) {
    return id;
  } else if (expectId) {
    throw new Error("No ID found in the slug");
  }

  const processRef = getProcessRef(router);

  if (processRef) {
    return processRef;
  }

  throw new Error("No key found in the slug");
};
