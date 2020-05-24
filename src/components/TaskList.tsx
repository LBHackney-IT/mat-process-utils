import { Link, List, Tag } from "lbh-frontend-react";
import querystring from "querystring";
import React from "react";
import { ParsedUrl } from "../helpers/ParsedUrl";

export enum TaskListStatus {
  Unavailable = "Unavailable",
  NotStarted = "Not started",
  Started = "Started",
  Completed = "Completed",
}

/**
 * An item in {@link TaskList}.
 */
export interface TaskListItem {
  /**
   * The name of the task.
   */
  name: string;

  url: ParsedUrl;

  /**
   * The status to display against the task.
   */
  status: TaskListStatus | undefined;

  /**
   * @ignore
   */
  "data-testid"?: string;
}

export interface TastListProps {
  items: TaskListItem[];
}

export const TaskList: React.FunctionComponent<TastListProps> = (props) => {
  const { items } = props;

  return (
    <>
      <List
        className="task-list"
        items={items.map(({ name, url, status, "data-testid": testId }) => {
          const href = url.pathname
            ? url.query && Object.keys(url.query).length > 0
              ? `${url.pathname}?${querystring.stringify(url.query)}`
              : url.pathname
            : "";

          return (
            <>
              <span>{name}</span>
              {status && status !== TaskListStatus.Unavailable && (
                <span>
                  {status !== TaskListStatus.NotStarted && <Tag>{status}</Tag>}
                  <Link href={href} data-testid={testId}>
                    {status === TaskListStatus.NotStarted
                      ? "Start"
                      : status === TaskListStatus.Completed
                      ? "Edit"
                      : "Continue"}
                  </Link>
                </span>
              )}
            </>
          );
        })}
      />

      <style jsx>{`
        :global(.task-list li) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1em;
        }

        :global(.task-list li .lbh-tag) {
          margin-right: 2em;
        }

        :global(.task-list li span),
        :global(.task-list li a) {
          margin: 0;
        }
      `}</style>
    </>
  );
};
