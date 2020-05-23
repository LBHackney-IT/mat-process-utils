import { NextRouter } from "next/router";
import { isRepeatingStep } from "./isStep";

export const getSlugFromRoute = <Slug extends string>(
  router: NextRouter,
  basePath: string,
  repeatingStepSlugs: Slug[]
): string | undefined => {
  const { slug } = router.query;

  if (slug === undefined) {
    return;
  }

  if (typeof slug === "string") {
    return slug;
  }

  if (
    isRepeatingStep(
      router,
      { pathname: `/${slug.join("/")}` },
      basePath,
      repeatingStepSlugs
    )
  ) {
    return slug.slice(0, -1).join("/");
  }

  return slug.join("/");
};
