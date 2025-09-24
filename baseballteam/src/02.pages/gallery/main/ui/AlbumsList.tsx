import { Link } from "react-router";
import styled from "styled-components";

import { ErrorWidget } from "@widgets/error";
import { AlbumCard, AlbumCardSkeleton, useAlbums } from "@entities/gallery";

export function AlbumsList() {
  const { data: albums, isLoading, isError, refetch } = useAlbums();

  if (isLoading) {
    return (
      <Container>
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
      </Container>
    );
  }

  if (isError || !albums) {
    return (
      <ErrorWidget message="앨범을 불러오는 데 실패했습니다">
        <button onClick={() => refetch()}>다시 시도</button>
      </ErrorWidget>
    );
  }

  return (
    <Container>
      {albums.map((album) => (
        <Link to={`/gallery/albums/${album.id}`} key={album.id}>
          <AlbumCard key={album.id} album={album} />
        </Link>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px 24px;
  gap: 32px;
`;
