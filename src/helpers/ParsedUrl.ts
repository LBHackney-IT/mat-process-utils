import { ParsedUrlQuery } from "querystring";

export type ParsedUrl = {
  pathname: string;
  query?: ParsedUrlQuery;
};
