import React from "react";
import { Details } from "./Details";
import {
  PostVisitActionInput,
  PostVisitActionInputProps,
} from "./PostVisitActionInput";

export type PostVisitActionInputDetailsProps = PostVisitActionInputProps & {
  summary: React.ReactNode;
  contentBefore?: React.ReactNode;
  contentAfter?: React.ReactNode;
};

export const PostVisitActionInputDetails: React.FunctionComponent<PostVisitActionInputDetailsProps> = (
  props
) => {
  const {
    summary,
    name,
    rows,
    label,
    contentBefore,
    contentAfter,
    value,
    onValueChange,
    required,
    disabled,
  } = props;

  const summaryId = `${name}-summary`;

  return (
    <Details summary={{ id: summaryId, value: summary }}>
      {contentBefore}

      <PostVisitActionInput
        label={{
          id: label?.id ? label.id : `${name}-label`,
          value: label?.value,
        }}
        name={name}
        rows={rows}
        value={value}
        onValueChange={onValueChange}
        required={required}
        disabled={disabled}
      />

      {contentAfter}
    </Details>
  );
};
