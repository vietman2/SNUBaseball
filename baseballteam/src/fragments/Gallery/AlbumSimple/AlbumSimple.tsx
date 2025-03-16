import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { AlbumType } from "@models/archive";

interface PreviewProps {
  album: AlbumType;
}

export function AlbumPreview({ album }: Readonly<PreviewProps>) {
  if (album.cover_images.length === 0) {
    return (
      <AlbumContainer>
        <PreviewImageWrapper />
        <span>{album.title}</span>
      </AlbumContainer>
    );
  }

  return (
    <AlbumContainer>
      <PreviewImageWrapper>
        <img src={album.cover_images[0].url} alt={album.title} />
      </PreviewImageWrapper>
      <span>{album.title}</span>
    </AlbumContainer>
  );
}

interface Props {
  album: AlbumType;
  onEdit: (album: AlbumType) => void;
  onDelete: (album: AlbumType) => void;
}

export function AlbumSimple({ album, onEdit, onDelete }: Readonly<Props>) {
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

const AlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  > span {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground500};
  }
`;

const PreviewImageWrapper = styled.div`
  min-width: 200px;
  max-width: 200px;
  min-height: 200px;
  max-height: 200px;

  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.33);
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.borderLight};

  overflow: hidden;

  > img {
    max-height: 200px;
    object-fit: contain;
    border-radius: 8px;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    min-width: 150px;
    max-width: 150px;
    min-height: 150px;
    max-height: 150px;
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
