import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ErrorPage, LoadingPage } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { colors } from "@contexts/theme";
import { AlbumSimple } from "@fragments/Albums";
import { AlbumType } from "@models/archive";
import { getAlbums } from "@services/archive";

export function AlbumList() {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const handleSelectAlbum = (album: AlbumType) => {
    navigate(`/archive/gallery/${album.id}`);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const albums = await getAlbums();

      if (albums) {
        setAlbums(albums);
      }

      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (!albums || albums.length === 0) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <button onClick={goBack} data-testid="back">
        <AppIcon icon="chevron-left" size={24} color={colors.mediumEmphasis} />
        아카이브 홈
      </button>
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

  > button {
    display: flex;
    align-items: center;
    gap: 4px;

    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.highEmphasis};

    cursor: pointer;
  }

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
