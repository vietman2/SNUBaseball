import { createContext, useContext } from "react";

import type { AlbumFormPayload } from "../models/payload";

type AlbumFormContextType = {
  title: string;
  setTitle: (title: string) => void;
  membersOnly: boolean;
  toggleMembersOnly: () => void;
  color: string;
  setColor: (color: string) => void;

  errorMsg: string;
  setErrorMsg: (msg: string) => void;

  resetForm: () => void;

  payload: AlbumFormPayload;
  isReady: boolean;
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
