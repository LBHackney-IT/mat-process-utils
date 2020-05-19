import React from "react";
import { SubmitProps, submitPropTypes } from "remultiform/step";
import { SubmitButtonProps, SubmitButtons } from "./SubmitButtons";

export const makeSubmit = (
  buttons: SubmitButtonProps | SubmitButtonProps[],
  basePath: string,
  stepSlugs: string[],
  repeatingStepSlugs?: string[]
): React.FunctionComponent<SubmitProps & { disabled?: boolean }> => {
  const buttonsProp = Array.isArray(buttons) ? buttons : [buttons];

  const Submit: React.FunctionComponent<
    SubmitProps & {
      disabled?: boolean;
    }
  > = ({ disabled, onSubmit }) => {
    return (
      <SubmitButtons
        basePath={basePath}
        stepSlugs={stepSlugs}
        repeatingStepSlugs={repeatingStepSlugs}
        buttons={buttonsProp}
        onSubmit={onSubmit}
        disabled={disabled}
      />
    );
  };

  Submit.displayName = "Submit";
  Submit.propTypes = submitPropTypes;

  return Submit;
};
