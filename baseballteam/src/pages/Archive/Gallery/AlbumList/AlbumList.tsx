import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useGallery } from "../_contexts";
import { AlbumListProvider, useAlbumList } from "./_contexts";
import { AlbumModal } from "./_modals";
import { AppIcon } from "@components/Icons";
import { AlbumType } from "@models/archive";

export function AlbumList() {
  return (
    <AlbumListProvider>
      <AlbumListContent />
    </AlbumListProvider>
  );
}

function AlbumListContent() {
  const navigate = useNavigate();
  const { albums } = useGallery();
  const { modalOpen, listActions } = useAlbumList();

  const goBack = () => {
    navigate("../");
  };

  return (
    <>
      <Container>
        <Header>
          <button onClick={goBack} data-testid="back">
            <AppIcon icon="chevron-left" size={24} color="#6C757D" />
            앨범 목록
          </button>
          <button onClick={listActions.createClick} data-testid="open-modal">
            <AppIcon icon="plus" size={14} color="#0F0F70" />
            새로 만들기
          </button>
        </Header>
        <List>
          {albums.map((album) => (
            <AlbumSimple
              key={album.id}
              album={album}
              onEdit={listActions.editClick}
              onDelete={listActions.deleteClick}
            />
          ))}
        </List>
      </Container>
      {modalOpen && <AlbumModal />}
    </>
  );
}

interface Props {
  album: AlbumType;
  onEdit: (album: AlbumType) => void;
  onDelete: (album: AlbumType) => void;
}

function AlbumSimple({ album, onEdit, onDelete }: Readonly<Props>) {
  return (
    <AlbumWrapper>
      <ImageWrapper>
        {album.cover_images.length > 0 ? (
          <img src={album.cover_images[0].url} alt={album.title} />
        ) : (
          <div />
        )}
      </ImageWrapper>
      <InfoWrapper>
        <span>
          {album.title}
          {album.members_only && (
            <AppIcon icon="lock" size={16} color="#212529" />
          )}
        </span>
        <div>
          <span>
            <AppIcon icon="image" size={14} color="#212529" />
            {album.num_images}
          </span>
          <span>
            <AppIcon icon="video" size={14} color="#212529" />
            {album.num_videos}
          </span>
        </div>
      </InfoWrapper>
      {album.id > 0 && (
        <ButtonsWrapper>
          <button onClick={() => onEdit(album)} data-testid="open-edit-modal">
            <AppIcon icon="pencil" size={14} color="#A1A1A1" />
          </button>
          <button onClick={() => onDelete(album)} data-testid="delete">
            <AppIcon icon="delete" size={16} color="#FF8080" />
          </button>
        </ButtonsWrapper>
      )}
    </AlbumWrapper>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  gap: 32px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > button:first-child {
    display: flex;
    align-items: center;
    gap: 4px;

    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground900};
  }

  > button:last-child {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    gap: 4px;

    font-size: 0.825rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};

    background-color: ${({ theme }) => theme.colors.borderLight};
    border-radius: 8px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 360px;
  max-width: 360px;
  gap: 16px;

  background-color: ${({ theme }) => theme.colors.background200};
  border-radius: 16px;

  @media (max-width: 768px) {
    min-width: 85vw;
    max-width: 85vw;
  }
`;

const ImageWrapper = styled.div`
  display: flex;

  > img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 16px 0 0 16px;
  }

  > div {
    width: 100px;
    height: 100px;
    background-color: ${({ theme }) => theme.colors.background700};
    border-radius: 16px 0 0 16px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 12px;

  > div {
    display: flex;
    gap: 8px;
  }

  span {
    display: flex;
    align-items: center;
    gap: 4px;

    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground700};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  gap: 8px;

  > button {
    display: flex;
    cursor: pointer;
  }
`;
