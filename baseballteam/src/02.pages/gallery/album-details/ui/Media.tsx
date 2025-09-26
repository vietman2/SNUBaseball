import styled from "styled-components";

import { ErrorWidget } from "@widgets/error";
import {
  MediaListHeaderItem,
  MediaListItem,
  MediaListItemSkeleton,
  Thumbnail,
  ThumbnailSkeleton,
  useAlbumDetails,
} from "@entities/gallery";
import { useViews } from "@shared/lib/views";
import { ElevatedLink, ElevatedTextButton } from "@shared/ui/Buttons";

interface Props {
  openModal: () => void;
}

export function Media({ openModal }: Readonly<Props>) {
  const { activeView } = useViews();
  const { data, isLoading, isError } = useAlbumDetails();

  if (isLoading) {
    return (
      <Container>
        {activeView === "LIST" ? (
          <List>
            <MediaListHeaderItem />
            <MediaListItemSkeleton />
            <MediaListItemSkeleton />
            <MediaListItemSkeleton />
            <MediaListItemSkeleton />
            <MediaListItemSkeleton />
          </List>
        ) : (
          <Grid>
            <ThumbnailSkeleton />
            <ThumbnailSkeleton />
            <ThumbnailSkeleton />
            <ThumbnailSkeleton />
            <ThumbnailSkeleton />
          </Grid>
        )}
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <ErrorWidget message="데이터 로딩 중 오류가 발생했습니다.">
        <div>
          <ElevatedLink to="/gallery">앨범 목록으로 돌아가기</ElevatedLink>
        </div>
      </ErrorWidget>
    );
  }

  if (data.media.length === 0) {
    return (
      <Container>
        <EmptyState openModal={openModal} />
      </Container>
    );
  }

  return (
    <Container>
      {activeView === "LIST" ? (
        <List>
          <MediaListHeaderItem />
          {data.media.map((media) => (
            <MediaListItem key={media.id} media={media} />
          ))}
        </List>
      ) : (
        <Grid>
          {data.media.map((media) => (
            <Thumbnail key={media.id} media={media} />
          ))}
        </Grid>
      )}
    </Container>
  );
}

interface Props {
  openModal: () => void;
}

function EmptyState({ openModal }: Readonly<Props>) {
  return (
    <EmptyStateContainer>
      <span>아직 업로드된 파일이 없습니다.</span>
      <span>첫번째 파일을 업로드 해보세요!</span>
      <div>
        <ElevatedTextButton onClick={openModal}>업로드하기</ElevatedTextButton>
      </div>
    </EmptyStateContainer>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
  gap: 12px;

  > span {
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
