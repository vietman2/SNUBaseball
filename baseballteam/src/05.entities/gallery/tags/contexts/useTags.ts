import { createContext, useContext } from "react";

import type { MediaTagType } from "../models/tags";

interface TagsContextType {
  tags: MediaTagType[];

  // 선택된 태그 (태그 필터링용)
  selectedTags: MediaTagType[];

  // 액션
  refresh: () => void;

  // 상태
  isLoading: boolean;
  isError: boolean;
}

export const TagsContext = createContext<TagsContextType | null>(null);

export function useTags() {
  const context = useContext(TagsContext);

  if (!context) {
    throw new Error("useTags must be used within a TagsProvider");
  }

  return context;
}
