export {
  RouterContext,
  type RouterContextType,
  useRouter,
} from "./contexts/useRouter";

export type {
  BackgroundState,
  RouterLocation,
  RouteSlice,
} from "./models/types";
export type { TabType, SubTabType, TabGroupType } from "./models/tabs";

export { MyModalTabs } from "./tabs/modal-tabs";

export { isEqual } from "./utils/isEqual";
export { getAllTabs, parseCurrentPath } from "./utils/url";
