//import { Admin } from "./admin";
import { Main } from "./main";
//import { Management } from "./management";
//import { Training } from "./training";

export type TabType = {
  title: string;
  icon: string;
  path: string;
  subtabs: SubTabType[];
};

export type SubTabType = {
  title: string;
  path: string;
};

export type TabGroup = {
  title: string;
  tabs: TabType[];
  limited: boolean;
};

export const tabgroups: TabGroup[] = [Main]; //, Training, Management, Admin];
