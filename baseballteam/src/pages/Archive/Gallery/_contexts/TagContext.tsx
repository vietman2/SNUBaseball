import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { MediaTagType } from "@models/archive";
import { getTags } from "@services/archive";

interface TagContextType {
  allTags: MediaTagType[];
  selectedTags: MediaTagType[];
  selectTag: (tag: MediaTagType) => void;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

export function TagProvider({ children }: { children: React.ReactNode }) {
  const [allTags, setAllTags] = useState<MediaTagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<MediaTagType[]>([]);

  const fetchTags = async () => {
    const response = await getTags();

    if (response) {
      setAllTags(response);
    }
  };

  const selectTag = (tag: MediaTagType) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const value = useMemo(
    () => ({
      allTags,
      selectedTags,
      selectTag,
    }),
    [allTags, selectedTags]
  );

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
}

export function useTag() {
  const context = useContext(TagContext);

  if (!context) {
    throw new Error("useTag must be used within a TagProvider");
  }

  return context;
}
