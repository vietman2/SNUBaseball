import { Link } from "react-router";
import styled from "styled-components";

import { NewAlbum } from "./ui/NewAlbum";
import { Breadcrumb } from "@widgets/breadcrumb";
import { ErrorWidget } from "@widgets/error";
import { ViewToggle } from "@widgets/viewtoggle";
import { AlbumCard, AlbumCardSkeleton, useGallery } from "@entities/gallery";
import { type BreadcrumbItemType } from "@shared/lib/views";

export function GalleryMainPage() {
  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      label: "앨범 목록",
      href: "/gallery",
    },
  ];

  return (
    <Container>
      <Header>
        <ViewToggle />
        <NewAlbum />
      </Header>
      <Breadcrumb items={breadcrumbItems} />
      <ListComponents />
    </Container>
  );
}

function ListComponents() {
  const { albums, isLoading, isError, refresh } = useGallery();

  if (isLoading) {
    return (
      <List>
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
      </List>
    );
  }

  if (isError || !albums) {
    return (
      <ErrorWidget message="앨범을 불러오는 데 실패했습니다">
        <button onClick={refresh}>다시 시도</button>
      </ErrorWidget>
    );
  }

  return (
    <List>
      {albums.map((album) => (
        <Link to={`/gallery/${album.id}`} key={album.id}>
          <AlbumCard key={album.id} album={album} />
        </Link>
      ))}
    </List>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px 24px;
  gap: 32px;
`;
