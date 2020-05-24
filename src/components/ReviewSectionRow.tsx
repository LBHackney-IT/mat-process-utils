import { Link } from "lbh-frontend-react";
import router from "next/router";
import React from "react";
import { makeNextRouterUrls } from "../helpers/makeNextRouterUrls";
import { makeUrlFromSlug } from "../helpers/makeUrlFromSlug";
import { stringifyUrl } from "../helpers/stringifyUrl";
import { Thumbnail } from "./Thumbnail";

export interface ReviewSectionRowProps<Slug extends string> {
  values?: React.ReactNode[];
  images?: string[];
  changeSlug?: Slug;
  basePath: string;
  stepSlugs: Slug[];
  repeatingStepSlugs: Slug[];
}

export const ReviewSectionRow: React.FunctionComponent<ReviewSectionRowProps<
  string
>> = (props) => {
  const {
    values,
    images,
    changeSlug,
    basePath,
    stepSlugs,
    repeatingStepSlugs,
  } = props;

  if ((!values || values.length === 0) && (!images || images.length === 0)) {
    return null;
  }

  const changeUrl =
    changeSlug === undefined
      ? undefined
      : makeNextRouterUrls(
          router,
          makeUrlFromSlug(router, changeSlug, basePath, { review: "true" }),
          basePath,
          stepSlugs,
          repeatingStepSlugs
        );

  return (
    <div className="row">
      {values && values.length > 0 && (
        <div className="values">
          {values.map((value, index) => (
            <div key={index}>{value}</div>
          ))}
        </div>
      )}
      {images && images.length > 0 && (
        <div className="images">
          {images.map((src, index) => (
            <div key={index}>
              <Thumbnail src={src} alt="Thumbnail of an uploaded image" />
            </div>
          ))}
        </div>
      )}
      {changeUrl && (
        <div className="change-link">
          <Link href={stringifyUrl(changeUrl.as)}>Change</Link>
        </div>
      )}
      <style jsx>{`
        .row {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
        }

        .images {
          flex: 1;
          margin-left: 2em;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .images > div {
          margin-left: 0.2em;
        }

        .change-link {
          margin-top: 0;
          margin-left: 2em;
        }
      `}</style>
    </div>
  );
};
