import { useSearchParams } from "react-router";
import styled from "styled-components";

import {
  AlbumCard,
  AlbumCardSkeleton,
  useAlbums,
} from "@entities/gallery/album";

export function Albums() {
  const [, setSearchParams] = useSearchParams();
  const { albums, selectedAlbum, isLoading } = useAlbums();

  const onAlbumClick = (albumTitle: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (next.get("album") === albumTitle) {
        next.delete("album");
      } else {
        next.set("album", albumTitle);
      }

      return next;
    });
  };

  if (isLoading) {
    return (
      <Container>
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      {albums.map((album) => (
        <button
          key={album.id}
          onClick={() => onAlbumClick(album.title)}
          data-testid={`album-${album.title}-card`}
        >
          <AlbumCard
            key={album.id}
            album={album}
            isActive={selectedAlbum?.id === album.id}
          />
        </button>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  gap: 16px;

  overflow-x: auto;
`;
