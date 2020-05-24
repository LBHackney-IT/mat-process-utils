import { Button } from "lbh-frontend-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { makeNextRouterUrls } from "../helpers/makeNextRouterUrls";
import { makeUrlFromSlug } from "../helpers/makeUrlFromSlug";
import { handleSubmission } from "./internal/handleSubmission";

export interface SubmitButtonProps<Slug extends string> {
  slug?: Slug;
  cancel?: boolean;
  value: string;
  afterSubmit?(): Promise<void>;
}

export interface SubmitButtonsProps<Slug extends string> {
  buttons: SubmitButtonProps<Slug>[];
  basePath: string;
  stepSlugs: Slug[];
  repeatingStepSlugs: Slug[];
  disabled?: boolean;
  onSubmit(): Promise<boolean>;
}

export const SubmitButtons: React.FunctionComponent<SubmitButtonsProps<
  string
>> = (props) => {
  const {
    buttons,
    basePath,
    stepSlugs,
    repeatingStepSlugs,
    disabled,
    onSubmit,
  } = props;

  const router = useRouter();

  const slugs = buttons
    .filter(({ slug, cancel }) => !cancel && slug !== undefined)
    .map(({ slug }) => slug) as string[];
  const urls = slugs.map(
    (slug) => makeUrlFromSlug(router, slug, basePath).pathname
  );

  useEffect(() => {
    for (const url of urls) {
      const { href } = makeNextRouterUrls(
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
            : makeNextRouterUrls(
                router,
                makeUrlFromSlug(router, nextSlug, basePath),
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
                if (!href.pathname || !as.pathname) {
                  return;
                }

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
