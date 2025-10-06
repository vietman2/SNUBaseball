import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";

import {
  TagsContext,
  type MediaTagType,
  useMediaTagsAPI,
} from "@entities/gallery/tags";

interface Props {
  children: ReactNode;
}

export function TagsProvider({ children }: Readonly<Props>) {
  const [selectedTags, setSelectedTags] = useState<MediaTagType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: tags, isLoading, isError, refetch } = useMediaTagsAPI();

  useEffect(() => {
    const tagNames = searchParams.getAll("tag");
    if (tags && tagNames.length > 0) {
      const foundTags = tags.filter((tag) => tagNames.includes(tag.name));
      setSelectedTags(foundTags);
      // 선택된 태그 중 일부가 없으면, URL을 초기화
      if (foundTags.length !== tagNames.length) {
        searchParams.delete("tag");
        foundTags.forEach((tag) => searchParams.append("tag", tag.name));
        setSearchParams(searchParams);
      }
    } else {
      setSelectedTags([]);
    }
  }, [tags, searchParams, setSearchParams]);

  const tagsValue = useMemo(
    () => ({
      tags: tags ?? [],
      selectedTags,
      refresh: refetch,
      isLoading,
      isError,
    }),
    [tags, selectedTags, refetch, isLoading, isError]
  );

  return (
    <TagsContext.Provider value={tagsValue}>{children}</TagsContext.Provider>
  );
}
