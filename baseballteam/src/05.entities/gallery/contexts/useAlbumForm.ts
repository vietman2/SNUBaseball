import { createContext, useContext } from "react";

type AlbumFormContextType = {
  title: string;
  setTitle: (title: string) => void;
  membersOnly: boolean;
  setMembersOnly: (membersOnly: boolean) => void;

  payload: { title: string; members_only: boolean };
  isUpdated: boolean;
};

export const AlbumFormContext = createContext<AlbumFormContextType | null>(
  null
);

export function useAlbumForm() {
  const context = useContext(AlbumFormContext);

  if (!context) {
    throw new Error("useAlbumForm must be used within a AlbumFormProvider");
  }

  return context;
}
