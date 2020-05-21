import React from "react";
import { SubmitProps } from "remultiform";
import { SubmitButtonProps, SubmitButtons } from "./SubmitButtons";

export const makeSubmit = <Slug extends string>(
  buttons: SubmitButtonProps<Slug> | SubmitButtonProps<Slug>[],
  basePath: string,
  stepSlugs: Slug[],
  repeatingStepSlugs: Slug[]
): React.FunctionComponent<SubmitProps & { disabled?: boolean }> => {
  const buttonsProp = Array.isArray(buttons) ? buttons : [buttons];

  const Submit: React.FunctionComponent<
    SubmitProps & {
      disabled?: boolean;
    }
  > = ({ disabled, onSubmit }) => {
    return (
      <SubmitButtons
        buttons={buttonsProp}
        basePath={basePath}
        stepSlugs={stepSlugs}
        repeatingStepSlugs={repeatingStepSlugs}
        onSubmit={onSubmit}
        disabled={disabled}
      />
    );
  };

  return Submit;
};
