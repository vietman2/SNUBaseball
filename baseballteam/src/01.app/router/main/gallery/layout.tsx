import { Outlet } from "react-router";
import styled from "styled-components";

import { GalleryProvider } from "@entities/gallery";
import { ViewsProvider } from "@shared/lib/views";
import { PageTitle } from "@shared/ui/Texts";

export function GalleryLayout() {
  return (
    <GalleryProvider>
      <ViewsProvider>
        <Wrapper>
          <PageTitle>갤러리</PageTitle>
          <Outlet />
        </Wrapper>
      </ViewsProvider>
    </GalleryProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
  gap: 8px;
`;
