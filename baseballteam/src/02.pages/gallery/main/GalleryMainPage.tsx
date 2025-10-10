import styled from "styled-components";

import { Albums } from "./ui/Albums";
import { Tags } from "./ui/Tags";
import { Media } from "./ui/Media";
import { ErrorWidget } from "@widgets/error";
import { ViewToggle } from "@widgets/viewtoggle";
import { AlbumBadge, useAlbums } from "@entities/gallery/album";
import { useMedia } from "@entities/gallery/media";
import { useTags } from "@entities/gallery/tags";
import { useColors } from "@shared/lib/styles";
import { ViewsProvider } from "@shared/lib/views";
import { SimpleBadge } from "@shared/ui/Badges";
import { TextLink } from "@shared/ui/Buttons";
import { AppIcon } from "@shared/ui/Icons";

export function GalleryMainPage() {
  const {
    selectedAlbum,
    isError: albumError,
    refresh: refreshAlbums,
  } = useAlbums();
  const { isError: tagsError, refresh: refreshTags } = useTags();
  const { refresh: refreshMedia } = useMedia();
  const { colors } = useColors();

  const refreshAll = () => {
    refreshAlbums();
    refreshTags();
    refreshMedia();
  };

  if (albumError || tagsError) {
    return (
      <ErrorWrapper>
        <ErrorWidget message="갤러리 정보를 불러오는 데 실패했습니다">
          <button onClick={refreshAll}>다시 시도</button>
        </ErrorWidget>
      </ErrorWrapper>
    );
  }

  return (
    <Container>
      <Header>
        <h2>앨범</h2>
        <Albums />
      </Header>
      <Section>
        <ViewsProvider>
          <Horizontal>
            <ViewToggle />
            <div>
              <TextLink
                to="/gallery/upload"
                $backgroundColor={colors.gray300}
                $color={colors.gray900}
              >
                <AppIcon icon="upload" size={16} color={colors.gray900} />
                업로드
              </TextLink>
            </div>
          </Horizontal>
          <TagsContainer>
            {selectedAlbum ? (
              <AlbumBadge album={selectedAlbum} />
            ) : (
              <SimpleBadge
                label="전체 앨범"
                icon="album"
                color={colors.gray700}
              />
            )}
            <Tags />
          </TagsContainer>
          <Media />
        </ViewsProvider>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 4px 12px;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > h2 {
    margin: 0;
    padding: 0 4px;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const Section = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  gap: 8px;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
`;
