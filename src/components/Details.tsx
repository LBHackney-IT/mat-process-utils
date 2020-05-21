import React from "react";

interface Summary {
  id: string;
  value: React.ReactNode;
}

interface Props {
  summary: React.ReactNode | Summary;
  children: React.ReactNode;
}

export const Details: React.FunctionComponent<Props> = (props) => {
  const { summary, children } = props;

  let summaryId: string | undefined = undefined;
  let summaryValue: React.ReactNode;
  const s = summary as Summary;

  if (s.id && s.value) {
    summaryId = s.id;
    summaryValue = s.value;
  } else if (summary) {
    summaryValue = summary;
  }

  return (
    <>
      <details>
        <summary id={summaryId}>{summaryValue}</summary>
        {children}
      </details>

      <style jsx>{`
        details {
          margin-top: 20px;
        }

        summary {
          text-decoration: underline;
          font-family: "Montserrat";
        }

        summary:hover {
          cursor: pointer;
        }

        summary :global(h2) {
          display: inline-block;
          margin: 0;
          color: #025ea6;
          font-size: 19px;
          font-family: "Montserrat";
          font-weight: 400;
        }

        summary :global(span) {
          margin-left: 18px;
          color: #0b0c0c;
          font-size: 19px;
          font-family: "Montserrat";
          font-weight: 300;
          display: inline-block;
        }

        details > :global(*:not(summary)) {
          margin-left: 18px;
        }
      `}</style>
    </>
  );
};
