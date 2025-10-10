import { Link, useSearchParams } from "react-router";
import styled from "styled-components";

import { ErrorWidget } from "@widgets/error";
import {
  MediaCard,
  MediaCardSkeleton,
  MediaRow,
  MediaRowHeader,
  MediaRowSkeleton,
  useMedia,
} from "@entities/gallery/media";
import { useViews } from "@shared/lib/views";
import { Pagination } from "@shared/ui/Pagination";

export function Media() {
  const [searchParams] = useSearchParams();
  const { media, num_pages, current_page, isLoading, isError, refresh } =
    useMedia();
  const { activeView } = useViews();

  if (isLoading) {
    if (activeView === "LIST") {
      return (
        <Container>
          <List>
            <MediaRowHeader />
            <MediaRowSkeleton />
            <MediaRowSkeleton />
            <MediaRowSkeleton />
            <MediaRowSkeleton />
            <MediaRowSkeleton />
          </List>
        </Container>
      );
    }
    return (
      <Grid>
        <MediaCardSkeleton />
        <MediaCardSkeleton />
        <MediaCardSkeleton />
        <MediaCardSkeleton />
        <MediaCardSkeleton />
      </Grid>
    );
  }

  if (isError) {
    return (
      <ErrorWrapper>
        <ErrorWidget message="데이터를 불러오는 데 실패했습니다">
          <button onClick={refresh}>다시 시도</button>
        </ErrorWidget>
      </ErrorWrapper>
    );
  }

  if (media.length === 0) {
    return (
      <EmptyStateContainer>
        <span>아직 업로드된 파일이 없습니다.</span>
        <span>첫번째 파일을 업로드 해보세요!</span>
        <Link to="/gallery/upload">업로드하기</Link>
      </EmptyStateContainer>
    );
  }

  if (activeView === "LIST") {
    return (
      <Container>
        <List>
          <MediaRowHeader />
          {media.map((m, index) => (
            <Link to={`/${m.key}?${searchParams.toString()}`} key={m.key}>
              <MediaRow index={index} media={m} />
            </Link>
          ))}
        </List>
        <Pagination numPages={num_pages} currentPage={current_page} />
      </Container>
    );
  }

  return (
    <Container>
      <Grid>
        {media.map((m) => (
          <Link to={`/${m.key}?${searchParams.toString()}`} key={m.key}>
            <MediaCard media={m} />
          </Link>
        ))}
      </Grid>
      <Pagination numPages={num_pages} currentPage={current_page} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;

  > a {
    border-radius: 8px;

    &:hover {
      transform: scale(1.01);
      transition: transform 0.2s;
      cursor: pointer;
    }
  }

  > a:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
  }
`;

const Grid = styled.div`
  --min: max(120px, 18%); // 최소 크기 120px, 최대 크기 18%

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--min), 1fr));
  gap: 24px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 72px;
  gap: 12px;

  > span {
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  a {
    margin-top: 4px;
    padding: 6px 12px;
    color: ${({ theme }) => theme.colors.onPrimary};
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
  }
`;
