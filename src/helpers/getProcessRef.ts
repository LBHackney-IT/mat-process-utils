import { NextRouter } from "next/router";
import { ON_SERVER } from "./environment";

export const getProcessRef = (router: NextRouter): string | undefined => {
  if (ON_SERVER) {
    return;
  }

  const ref = router.query.processRef;

  let processRef: string | undefined = undefined;

  if (ref) {
    processRef = typeof ref === "string" ? ref : ref.join("/");
  }

  if (router.route && router.route.includes("[processRef]")) {
    processRef = processRef || "placeholder-process-ref";
  }

  if (process.env.NODE_ENV !== "production") {
    processRef = processRef || process.env.TEST_PROCESS_REF;
  }

  return processRef;
};
