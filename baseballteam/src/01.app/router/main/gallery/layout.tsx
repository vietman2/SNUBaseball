import { Outlet } from "react-router";
import styled from "styled-components";

import { AlbumProvider } from "./providers/AlbumProvider";
import { TagsProvider } from "./providers/TagsProvider";
import { MediaProvider } from "./providers/MediaProvider";
import { GalleryMainPage } from "@pages/gallery/main";
import { useUser } from "@entities/user";
import { useColors } from "@shared/lib/styles";
import { TextLink } from "@shared/ui/Buttons";
import { AppIcon } from "@shared/ui/Icons";
import { PageTitle } from "@shared/ui/Texts";

export function GalleryLayout() {
  const { colors } = useColors();
  const { user } = useUser();

  return (
    <AlbumProvider>
      <TagsProvider>
        <MediaProvider>
          <Wrapper>
            <Header>
              <PageTitle>갤러리</PageTitle>
              <div>
                {user && user.role !== "MEMBER" && (
                  <TextLink
                    to="/gallery/admin/albums"
                    $backgroundColor={colors.gray300}
                    $color={colors.gray900}
                  >
                    <AppIcon icon="settings" size={16} color={colors.gray900} />
                    관리자 메뉴
                  </TextLink>
                )}
              </div>
            </Header>
            <GalleryMainPage />
            <Outlet />
          </Wrapper>
        </MediaProvider>
      </TagsProvider>
    </AlbumProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
