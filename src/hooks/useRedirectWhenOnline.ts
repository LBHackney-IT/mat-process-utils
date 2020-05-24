import { useRouter } from "next/router";
import { useAsync } from "react-async-hook";
import { makeNextRouterUrls } from "../helpers/makeNextRouterUrls";
import { makeUrlFromSlug } from "../helpers/makeUrlFromSlug";
import { useOnlineWithRetry } from "./useOnlineWithRetry";

export interface UseRedirectWhenOnlineReturn {
  result?: boolean;
  errors?: Error[];
}

export const useRedirectWhenOnline = <Slug extends string>(
  slug: Slug,
  basePath: string,
  stepSlugs: Slug[],
  repeatingStepSlugs: Slug[],
  method: "push" | "replace" = "push",
  retryDelay = 3000
): UseRedirectWhenOnlineReturn => {
  const router = useRouter();
  const online = useOnlineWithRetry(retryDelay);

  const result: UseRedirectWhenOnlineReturn = {};

  if (online.error) {
    result.errors = [online.error];
  }

  const redirect = useAsync(
    async (result: boolean | undefined) => {
      if (result) {
        const { href, as } = makeNextRouterUrls(
          router,
          makeUrlFromSlug(router, slug, basePath),
          basePath,
          stepSlugs,
          repeatingStepSlugs
        );

        if (!href.pathname || !as.pathname) {
          return false;
        }

        return await router[method](href, as);
      }

      return false;
    },
    [online.result]
  );

  if (redirect.error) {
    result.errors = result.errors
      ? [...result.errors, redirect.error]
      : [redirect.error];
  }

  if (!result.errors) {
    result.result = online.result;
  }

  return result;
};
