import { Button } from "lbh-frontend-react";
import { NextRouter, useRouter } from "next/router";
import querystring from "querystring";
import React, { useEffect } from "react";
import { getProcessRef } from "../helpers/getProcessRef";
import { prefixUrl } from "../helpers/prefixUrl";
import { handleSubmission } from "./internal/handleSubmission";

const urlObjectForSlug = (
  router: NextRouter,
  slug: string,
  basePath: string,
  query?:
    | {
        [s: string]: string;
      }
    | undefined
): { pathname: string } => {
  return prefixUrl(router, basePath, { pathname: `/${slug}`, query: query });
};

const isRepeatingStep = (
  router: NextRouter,
  url: { pathname: string },
  basePath: string,
  repeatingStepSlugs: string[]
): boolean => {
  const { pathname } = prefixUrl(router, basePath, url);
  const parts = pathname.split("/");
  const maybeSlugId = parts[parts.length - 1];

  return Boolean(
    repeatingStepSlugs.find((slug) => {
      const slugUrl = urlObjectForSlug(router, basePath, slug);

      // This will stop working properly if we ever have nested routes.
      return pathname === `${slugUrl.pathname}/${maybeSlugId}`;
    })
  );
};

const isStep = (
  router: NextRouter,
  url: { pathname: string },
  basePath: string,
  stepSlugs: string[],
  repeatingStepSlugs?: string[]
): boolean => {
  const { pathname } = prefixUrl(router, basePath, url);

  return Boolean(
    stepSlugs.find((slug) => {
      const slugUrl = urlObjectForSlug(router, slug, basePath);

      return pathname === slugUrl.pathname;
    }) ||
      (repeatingStepSlugs !== undefined &&
        isRepeatingStep(router, url, basePath, repeatingStepSlugs))
  );
};

const urlsForRouter = (
  router: NextRouter,
  url:
    | string
    | {
        pathname: string;
        query?: { [s: string]: string };
      },
  basePath: string,
  stepSlugs: string[],
  repeatingStepSlugs?: string[]
): {
  href: {
    pathname: string;
    query?: { [s: string]: string };
  };
  as: {
    pathname: string;
    query?: { [s: string]: string };
  };
} => {
  let href: {
    pathname: string;
    query?: { [s: string]: string };
  };

  if (typeof url === "string") {
    const urlComponents = url.split("?", 2);
    const pathname = urlComponents[0];
    const query = querystring.parse(urlComponents[1]) as {
      [key: string]: string;
    };

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

export interface SubmitButtonProps {
  slug?: string;
  cancel?: boolean;
  value: string;
  afterSubmit?(): Promise<void>;
}

interface Props {
  basePath: string;
  stepSlugs: string[];
  repeatingStepSlugs?: string[];
  buttons: SubmitButtonProps[];
  disabled?: boolean;
  onSubmit(): Promise<boolean>;
}

export const SubmitButtons: React.FunctionComponent<Props> = (props) => {
  const {
    basePath,
    stepSlugs,
    repeatingStepSlugs,
    buttons,
    disabled,
    onSubmit,
  } = props;

  const router = useRouter();

  const slugs = buttons
    .filter(({ slug, cancel }) => !cancel && slug !== undefined)
    .map(({ slug }) => slug) as string[];
  const urls = slugs.map(
    (slug) => urlObjectForSlug(router, slug, basePath).pathname
  );

  useEffect(() => {
    for (const url of urls) {
      const { href } = urlsForRouter(
        router,
        url,
        basePath,
        stepSlugs,
        repeatingStepSlugs
      );

      if (!href.pathname) {
        continue;
      }

      router.prefetch(href.pathname);
    }
  }, [router, basePath, stepSlugs, repeatingStepSlugs, urls]);

  return (
    <>
      {buttons.map(({ slug, value, cancel, afterSubmit }, i) => {
        const nextSlug = slug;
        // const nextSlug = router.query.review ? PageSlugs.Review : slug;

        const { href, as } =
          nextSlug === undefined
            ? { href: { pathname: undefined }, as: { pathname: undefined } }
            : urlsForRouter(
                router,
                urlObjectForSlug(router, nextSlug, basePath),
                basePath,
                stepSlugs,
                repeatingStepSlugs
              );

        return (
          <span key={i}>
            <Button
              className={
                i > 0
                  ? "submit-button lbh-button--secondary govuk-button--secondary"
                  : "submit-button"
              }
              disabled={
                disabled || (!cancel && (!href.pathname || !as.pathname))
              }
              onClick={async (): Promise<void> => {
                await handleSubmission(
                  router,
                  href,
                  as,
                  onSubmit,
                  afterSubmit,
                  cancel
                );
              }}
              data-testid={i > 0 ? undefined : "submit"}
            >
              {value}
            </Button>
          </span>
        );
      })}
      <style jsx>{`
        span:not(:last-child) {
          margin-right: 1em;
        }
      `}</style>
    </>
  );
};
