import styled from "styled-components";

import { AlbumsList } from "./ui/AlbumsList";
import { NewAlbum } from "./ui/NewAlbum";
import { GalleryProvider } from "@entities/gallery";
import { PageTitle } from "@shared/ui/Texts";

export function GalleryMainPage() {
  return (
    <GalleryProvider>
      <Container>
        <PageTitle>갤러리</PageTitle>
        <Header>
          <div />
          <NewAlbum />
        </Header>
        <AlbumsList />
      </Container>
    </GalleryProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
