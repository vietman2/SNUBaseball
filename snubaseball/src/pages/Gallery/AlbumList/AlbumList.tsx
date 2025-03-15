import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { LoadingPage } from "@components/Fallbacks";
import { useGallery } from "@contexts/gallery";
import { AlbumSimple } from "@fragments/Albums";
import { AlbumType } from "@models/archive";

export function AlbumList() {
  const { albums, loading } = useGallery();
  const navigate = useNavigate();

  const handleSelectAlbum = (album: AlbumType) => {
    navigate(`/gallery/${album.id}`);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <AlbumsList>
        {albums.map((album) => (
          <button
            key={album.id}
            onClick={() => handleSelectAlbum(album)}
            data-testid={`album-${album.id}`}
          >
            <AlbumSimple album={album} />
          </button>
        ))}
      </AlbumsList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
  gap: 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const AlbumsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;

  transition: max-height 0.5s;

  @media (max-width: 768px) {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
`;
