import { Button } from "lbh-frontend-react";
import { useRouter } from "next/router";
import React from "react";
import { makeNextRouterUrls } from "../helpers/makeNextRouterUrls";
import { makeUrlFromSlug } from "../helpers/makeUrlFromSlug";
import { ProcessStage } from "../helpers/ProcessStage";
import { handleSubmission } from "./internal/handleSubmission";

export interface ManagerSubmitButtonsProps<Slug extends string> {
  targetSlug: Slug;
  basePath: string;
  stepSlugs: Slug[];
  repeatingStepSlugs: Slug[];
  disabled?: boolean;
  onApprove(): Promise<boolean>;
  onDecline(): Promise<boolean>;
}

export const ManagerSubmitButtons: React.FunctionComponent<ManagerSubmitButtonsProps<
  string
>> = (props) => {
  const {
    targetSlug,
    basePath,
    stepSlugs,
    repeatingStepSlugs,
    disabled,
    onApprove,
    onDecline,
  } = props;

  const router = useRouter();

  const targetUrl = makeUrlFromSlug(router, targetSlug, basePath);
  const approveUrls = makeNextRouterUrls(
    router,
    { ...targetUrl, query: { status: ProcessStage.Approved } },
    basePath,
    stepSlugs,
    repeatingStepSlugs
  );
  const declineUrls = makeNextRouterUrls(
    router,
    { ...targetUrl, query: { status: ProcessStage.Declined } },
    basePath,
    stepSlugs,
    repeatingStepSlugs
  );

  return (
    <>
      <Button
        preventDoubleClick
        disabled={disabled}
        className="approve-button"
        onClick={async (): Promise<void> => {
          await handleSubmission(
            router,
            approveUrls.href,
            approveUrls.as,
            onApprove
          );
        }}
        data-testid="approve"
      >
        Approve
      </Button>
      <Button
        preventDoubleClick
        disabled={disabled}
        className="decline-button lbh-button--warning govuk-button--warning"
        onClick={async (): Promise<void> => {
          await handleSubmission(
            router,
            declineUrls.href,
            declineUrls.as,
            onDecline
          );
        }}
        data-testid="decline"
      >
        Decline
      </Button>
      <style jsx>{`
        :global(.decline-button) {
          margin-left: 1em;
        }
      `}</style>
    </>
  );
};
