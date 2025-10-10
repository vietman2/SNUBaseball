import { createContext, useContext } from "react";

import type { TagFormPayload } from "../models/payload";

type TagFormContextType = {
  // 상태
  name: string;
  setName: (name: string) => void;
  color: string;
  setColor: (color: string) => void;
  icon: string;
  setIcon: (icon: string) => void;

  errorMsg: string;
  setErrorMsg: (msg: string) => void;

  // 액션
  resetForm: () => void;

  // 유효성
  payload: TagFormPayload;
  isReady: boolean;
};

export const TagFormContext = createContext<TagFormContextType | null>(null);

export function useTagForm() {
  const context = useContext(TagFormContext);

  if (!context) {
    throw new Error("useTagForm must be used within a TagFormProvider");
  }

  return context;
}
