import React from "react";

export interface TableProps {
  headings: string[];
  rows: React.ReactNode[][];
}

export const Table: React.FunctionComponent<TableProps> = (props) => {
  const { headings, rows } = props;

  return (
    <table>
      <thead>
        <tr>
          {headings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((column, index) => (
              <td key={index}>{column}</td>
            ))}
          </tr>
        ))}
      </tbody>

      <style jsx>{`
        table {
          width: 100%;
          text-align: left;
          font-family: "Montserrat";
        }
      `}</style>
    </table>
  );
};
