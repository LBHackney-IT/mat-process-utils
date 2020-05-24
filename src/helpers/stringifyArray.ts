export const stringifyArray = (arr: string[]): string =>
  arr.join(", ").replace(/, ([^,]*)$/, " and $1");
