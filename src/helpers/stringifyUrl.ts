import querystring from "querystring";
import { ParsedUrl } from "./ParsedUrl";

export const stringifyUrl = (url: ParsedUrl): string =>
  url.query && Object.keys(url.query).length > 0
    ? `${url.pathname}?${querystring.stringify(url.query)}`
    : url.pathname;
