import {
  Heading,
  HeadingLevels,
  Paragraph,
  SummaryList,
} from "lbh-frontend-react";
import React from "react";

export interface ReviewSectionEntry {
  key: string;
  value: React.ReactNode;
}

export interface ReviewSectionProps {
  heading: string;
  loading: boolean;
  rows?: ReviewSectionEntry[];
}

export const ReviewSection: React.FunctionComponent<ReviewSectionProps> = (
  props
) => {
  const { heading, loading, rows } = props || {};

  return (
    <>
      <Heading level={HeadingLevels.H2}>{heading}</Heading>
      {loading ? (
        <Paragraph>Loading...</Paragraph>
      ) : (
        rows && rows.length > 0 && <SummaryList rows={rows} />
      )}
    </>
  );
};
