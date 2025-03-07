import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { MediaTagType } from "@models/archive";
import { getTags } from "@services/archive";

interface TagContextType {
  allTags: MediaTagType[];
  selectedTag: MediaTagType | null;
  selectTag: (tag: MediaTagType | null) => void;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

export function TagProvider({ children }: { children: React.ReactNode }) {
  const [allTags, setAllTags] = useState<MediaTagType[]>([]);
  const [selectedTag, setSelectedTag] = useState<MediaTagType | null>(null);

  const fetchTags = async () => {
    const response = await getTags();

    if (response) {
      setAllTags(response);
    }
  };

  const selectTag = (tag: MediaTagType | null) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const value = useMemo(
    () => ({
      allTags,
      selectedTag,
      selectTag,
    }),
    [allTags, selectedTag]
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
