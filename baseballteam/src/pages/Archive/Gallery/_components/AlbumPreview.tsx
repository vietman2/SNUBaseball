import styled from "styled-components";

import { AlbumType } from "@models/archive";

interface Props {
  album: AlbumType;
}

export function AlbumPreview({ album }: Readonly<Props>) {
  if (album.cover_images.length === 0) {
    return (
      <AlbumContainer>
        <ImageWrapper />
        <span>{album.title}</span>
      </AlbumContainer>
    );
  }

  return (
    <AlbumContainer>
      <ImageWrapper>
        <img src={album.cover_images[0].url} alt={album.title} />
      </ImageWrapper>
      <span>{album.title}</span>
    </AlbumContainer>
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

const ImageWrapper = styled.div`
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
