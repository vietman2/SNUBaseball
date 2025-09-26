import styled from "styled-components";

import type { MediaThumbnailType } from "../models/media";
import { useColors } from "@shared/lib/styles";
import { Skeleton } from "@shared/ui/Loading";

export function MediaListHeaderItem() {
  const { colors } = useColors();

  return (
    <HeaderRow>
      <span className="media-id-column">ID</span>
      <span className="media-url-column">URL</span>
      <span className="media-uploaded-at-column">업로드 날짜</span>
      <span className="media-uploaded-by-column">업로드 사용자</span>
    </HeaderRow>
  );
}

interface Props {
  media: MediaThumbnailType;
}

export function MediaListItem({ media }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Container>
      <span className="media-id-column">{media.id}</span>
      <span className="media-url-column">{media.url}</span>
      <span className="media-uploaded-at-column">{media.created_at}</span>
      <span className="media-uploaded-by-column">{media.uploaded_by}</span>
    </Container>
  );
}

export function MediaListItemSkeleton() {
  return <Skeleton height={48} width={"100%"} borderRadius={8} />;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;

  > span {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 8px;
    max-width: 150px;

    &.media-id-column {
      max-width: 50px;
    }

    &.media-url-column {
      flex: 3;
      max-width: none;
      justify-content: flex-start;
      color: ${({ theme }) => theme.colors.primary};
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    &.media-uploaded-at-column {
      max-width: 200px;
    }

    &.media-uploaded-by-column {
      max-width: 150px;
    }

    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

const HeaderRow = styled(Container)`
  font-weight: 600;

  &:hover {
    transform: none;
  }
`;
