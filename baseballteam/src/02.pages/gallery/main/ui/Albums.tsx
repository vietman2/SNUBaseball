import { Link } from "react-router";
import styled from "styled-components";

import { ErrorWidget } from "@widgets/error";
import {
  AlbumCard,
  AlbumCardSkeleton,
  AlbumListHeaderItem,
  AlbumListItem,
  AlbumListItemSkeleton,
  useGallery,
} from "@entities/gallery";
import { useViews } from "@shared/lib/views";

export function Albums() {
  const { albums, isLoading, isError, refresh } = useGallery();
  const { activeView } = useViews();

  if (isLoading) {
    if (activeView === "LIST") {
      return (
        <List>
          <AlbumListHeaderItem />
          <AlbumListItemSkeleton />
          <AlbumListItemSkeleton />
          <AlbumListItemSkeleton />
        </List>
      );
    }

    return (
      <Grid>
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
      </Grid>
    );
  }

  if (isError || !albums) {
    return (
      <ErrorWidget message="앨범을 불러오는 데 실패했습니다">
        <button onClick={refresh}>다시 시도</button>
      </ErrorWidget>
    );
  }

  if (activeView === "GRID") {
    return (
      <Grid>
        {albums.map((album) => (
          <Link to={`/gallery/${album.id}`} key={album.id}>
            <AlbumCard key={album.id} album={album} />
          </Link>
        ))}
      </Grid>
    );
  }

  return (
    <List>
      <AlbumListHeaderItem />
      {albums.map((album) => (
        <Link to={`/gallery/${album.id}`} key={album.id}>
          <AlbumListItem album={album} />
        </Link>
      ))}
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;

  > a:not(:first-child) {
    border-top: 1px solid ${({theme}) => theme.colors.divider};
  }

  > a:nth-child(even) {
    background-color: ${({theme}) => theme.colors.backgroundPaper};
  }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px 24px;
  gap: 32px;
`;
