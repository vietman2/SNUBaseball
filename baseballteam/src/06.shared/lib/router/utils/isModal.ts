import type { RouterLocation } from "../models/types";

export function isModal(
  backgroundLocation: RouterLocation,
  displayLocation: RouterLocation
) {
  return (
    backgroundLocation.key !== displayLocation.key &&
    (backgroundLocation.pathname !== displayLocation.pathname ||
      backgroundLocation.search !== displayLocation.search ||
      backgroundLocation.hash !== displayLocation.hash)
  );
}
