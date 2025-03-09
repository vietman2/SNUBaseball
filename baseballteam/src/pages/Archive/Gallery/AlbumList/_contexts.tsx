import { createContext, useContext, useMemo, useState } from "react";

import { AlbumType } from "@models/archive";
import { createAlbum, removeAlbum, updateAlbum } from "@services/archive";

interface AlbumListContextType {
  listActions: {
    createClick: () => void;
    editClick: (album: AlbumType) => void;
    deleteClick: (album: AlbumType) => void;
  };
  modalActions: {
    selectedAlbum: AlbumType | null;
    titleInput: string;
    setTitleInput: (title: string) => void;
    membersOnly: boolean;
    setMembersOnly: (membersOnly: boolean) => void;
    handleSubmit: () => void;
  };
  // Common
  modalOpen: boolean;
  toggleModal: () => void;
}

const AlbumListContext = createContext<AlbumListContextType | undefined>(
  undefined
);

export function AlbumListProvider({ children }: { children: React.ReactNode }) {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [titleInput, setTitleInput] = useState<string>("");
  const [membersOnly, setMembersOnly] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  // List Actions
  const createClick = () => {
    setSelectedAlbum(null);
    setTitleInput("");
    setMembersOnly(false);
    toggleModal();
  };

  const editClick = (album: AlbumType) => {
    setSelectedAlbum(album);
    setTitleInput(album.title);
    setMembersOnly(album.members_only);
    toggleModal();
  };

  const deleteAlbum = async (album: AlbumType) => {
    if (
      window.confirm(
        "정말 삭제하시겠습니까?\n앨범을 삭제하면, 앨범에 속한 모든 미디어는 미분류 앨범으로 이동합니다."
      )
    ) {
      const response = await removeAlbum(album.id);

      if (response) {
        //await fetchAlbums();
        return true;
      } else {
        return false;
      }
    }
  };

  const createNewAlbum = async (title: string, membersOnly: boolean) => {
    const response = await createAlbum(title, membersOnly);

    if (response) {
      //await fetchAlbums();
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (selectedAlbum) {
      const result = await updateAlbum(
        selectedAlbum.id,
        titleInput,
        membersOnly
      );
      if (result) {
        toggleModal();
      } else {
        window.alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      const result = await createNewAlbum(titleInput, membersOnly);
      if (result) {
        toggleModal();
      } else {
        window.alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const value = useMemo(
    () => ({
      listActions: {
        createClick,
        editClick,
        deleteClick: deleteAlbum,
      },
      modalActions: {
        selectedAlbum,
        titleInput,
        setTitleInput,
        membersOnly,
        setMembersOnly,
        handleSubmit,
      },
      modalOpen,
      toggleModal,
    }),
    [titleInput, membersOnly, modalOpen]
  );

  return (
    <AlbumListContext.Provider value={value}>
      {children}
    </AlbumListContext.Provider>
  );
}

export function useAlbumList() {
  const context = useContext(AlbumListContext);

  if (!context) {
    throw new Error("useAlbum must be used within a AlbumProvider");
  }

  return context;
}
