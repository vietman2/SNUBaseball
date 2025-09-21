import type { ModalTabType } from "../models/tabs";

export const MyModalTabs: ModalTabType = {
  baseURL: "my",
  tabs: [
    { label: "계정", href: "account", icon: "person" },
    { label: "게시판", href: "posts", icon: "forum" },
    //{ label: "비밀번호 변경", href: "change-password", icon: "lock" },
  ],
};
