import { useState } from "react";
import styled from "styled-components";

import { AlbumRow, AlbumRowHeader } from "./ui/AlbumRow";
import { SimpleModal, useSimpleModal } from "@widgets/modal";
import {
  AlbumCreateForm,
  AlbumEditForm,
  AlbumFormProvider,
} from "@features/gallery/albums/compose";
import { useAlbums, type AlbumType } from "@entities/gallery/album";

export function ManageAlbums() {
  const { isOpen, open, close } = useSimpleModal();
  const [activeAlbum, setActiveAlbum] = useState<AlbumType | null>(null);
  const { albums } = useAlbums();

  const openCreateSheet = () => {
    setActiveAlbum(null);
    open();
  };

  const openEditSheet = (album: AlbumType) => {
    setActiveAlbum(album);
    open();
  };

  return (
    <Container>
      <Header>
        <h3>앨범 관리</h3>
        <Button onClick={openCreateSheet}>새 앨범 추가</Button>
      </Header>
      <List>
        <AlbumRowHeader />
        {albums.map((album) => (
          <AlbumRow
            key={album.id}
            album={album}
            openSheet={() => openEditSheet(album)}
          />
        ))}
      </List>
      <SimpleModal isOpen={isOpen} onClose={close} minWidth={280}>
        {activeAlbum ? (
          <AlbumFormProvider initialAlbum={activeAlbum}>
            <AlbumEditForm album={activeAlbum} close={close} />
          </AlbumFormProvider>
        ) : (
          <AlbumFormProvider>
            <AlbumCreateForm close={close} />
          </AlbumFormProvider>
        )}
      </SimpleModal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;

  overflow: hidden;

  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 4px;

  overflow-y: auto;

  > div:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
  }
`;

const Button = styled.button`
  padding: 4px 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.onPrimary};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
`;
