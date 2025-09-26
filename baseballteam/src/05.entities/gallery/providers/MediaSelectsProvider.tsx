import { useCallback, useMemo, useState, type ReactNode } from "react";

import { MediaSelectsContext } from "../contexts/useMediaSelects";
import type { AlbumType } from "../models/album";
import type { MediaTagType } from "../models/tags";

interface Props {
  children: ReactNode;
  initialAlbum: AlbumType | null;
}

export function MediaSelectsProvider({
  children,
  initialAlbum,
}: Readonly<Props>) {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(
    initialAlbum
  );
  const [selectedTags, setSelectedTags] = useState<MediaTagType[]>([]);

  const selectTag = useCallback((tag: MediaTagType) => {
    setSelectedTags((prev) => {
      if (prev.find((t) => t.id === tag.id)) {
        return prev.filter((t) => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  }, []);

  const payload = useMemo(() => {
    return {
      album: selectedAlbum,
      tags: selectedTags,
    };
  }, [selectedAlbum, selectedTags]);

  const value = useMemo(() => {
    return {
      selectedAlbum,
      setSelectedAlbum,
      selectedTags,
      selectTag,
      payload,
    };
  }, [selectedAlbum, selectedTags, selectTag, payload]);

  return (
    <MediaSelectsContext.Provider value={value}>
      {children}
    </MediaSelectsContext.Provider>
  );
}
