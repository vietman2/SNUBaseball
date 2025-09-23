import type { RouterLocation } from "../models/types";

export function isEqual(a: RouterLocation, b: RouterLocation) {
  return (
    a.pathname === b.pathname && a.search === b.search && a.hash === b.hash
  );
}
