import { NextRouter } from "next/router";
import { makeUrlFromSlug } from "./makeUrlFromSlug";
import { ParsedUrl } from "./ParsedUrl";
import { prefixUrl } from "./prefixUrl";

export const isRepeatingStep = <Slug extends string>(
  router: NextRouter,
  url: ParsedUrl,
  basePath: string,
  repeatingStepSlugs: Slug[]
): boolean => {
  const { pathname } = prefixUrl(router, basePath, url);
  const parts = pathname.split("/");
  const maybeSlugId = parts[parts.length - 1];

  return Boolean(
    repeatingStepSlugs.find((slug) => {
      const slugUrl = makeUrlFromSlug(router, basePath, slug);

      // This will stop working properly if we ever have nested routes.
      return pathname === `${slugUrl.pathname}/${maybeSlugId}`;
    })
  );
};

export const isStep = <Slug extends string>(
  router: NextRouter,
  url: ParsedUrl,
  basePath: string,
  stepSlugs: Slug[],
  repeatingStepSlugs: Slug[]
): boolean => {
  const { pathname } = prefixUrl(router, basePath, url);

  return Boolean(
    stepSlugs.find((slug) => {
      const slugUrl = makeUrlFromSlug(router, slug, basePath);

      return pathname === slugUrl.pathname;
    }) || isRepeatingStep(router, url, basePath, repeatingStepSlugs)
  );
};
