import type { ModalTabType } from "../models/tabs";

export const ProfileModalTabs: ModalTabType = {
  baseURL: "profile",
  tabs: [
    { label: "계정", href: "account", icon: "person" },
    //{ label: "비밀번호 변경", href: "change-password", icon: "lock" },
  ],
};
