import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { AlbumType, MediaTagType } from "@models/archive";
import { MemberMiniType } from "@models/user";
import { getAlbums, getTags } from "@services/archive";
import { searchMembers } from "@services/person";

interface GalleryContextType {
  albums: AlbumType[];
  people: MemberMiniType[];
  allTags: MediaTagType[];
  memberQuery: string;
  setMemberQuery: (query: string) => void;
  update: () => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [allTags, setAllTags] = useState<MediaTagType[]>([]);
  const [people, setPeople] = useState<MemberMiniType[]>([]);

  const [memberQuery, setMemberQuery] = useState<string>("");
  const [updateCount, setUpdateCount] = useState<number>(0);

  const fetchAlbums = async () => {
    const response = await getAlbums();

    if (response) {
      setAlbums(response);
    }
  };

  const fetchTags = async () => {
    const response = await getTags();

    if (response) {
      setAllTags(response);
    }
  };

  const fetchMembers = async (query: string) => {
    const response = await searchMembers(query);

    if (response) {
      setPeople(response);
    }
  };

  const handleUpdate = () => {
    setUpdateCount((prev) => prev + 1);
  };

  useEffect(() => {
    fetchAlbums();
    fetchTags();
    fetchMembers(memberQuery);
  }, []);

  useEffect(() => {
    fetchAlbums();
    fetchTags();
  }, [updateCount]);

  useEffect(() => {
    fetchMembers(memberQuery);
  }, [memberQuery]);

  const value = useMemo(
    () => ({
      albums,
      allTags,
      people,
      memberQuery,
      setMemberQuery,
      update: handleUpdate,
    }),
    [albums, allTags, people, memberQuery]
  );

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);

  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }

  return context;
}
