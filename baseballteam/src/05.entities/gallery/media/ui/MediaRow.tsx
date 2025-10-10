import styled from "styled-components";

import type { MediaType } from "../models/media";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";
import { Skeleton } from "@shared/ui/Loading";
import { TagBadge } from "@entities/gallery/tags";

export function MediaRowHeader() {
  return (
    <HeaderRow>
      <Cell className="media-id-column"></Cell>
      <NameColumn>파일명</NameColumn>
      <AlbumColumn>앨범</AlbumColumn>
      <TagsColumn>태그</TagsColumn>
      <Cell>업로드 날짜</Cell>
      <Cell>업로드</Cell>
    </HeaderRow>
  );
}

interface Props {
  index: number;
  media: MediaType;
}

export function MediaRow({ index, media }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Container>
      <Cell className="media-id-column">{index + 1}</Cell>
      <NameColumn>
        <AppIcon
          icon={media.type === "IMAGE" ? "image" : "video"}
          size={16}
          color={colors.textPrimary}
        />
        {media.filename}
      </NameColumn>
      <AlbumColumn>{media.album.title}</AlbumColumn>
      <TagsColumn>
        {media.tags.length > 0
          ? media.tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} isActive />
            ))
          : "-"}
      </TagsColumn>
      <Cell>{media.created_at}</Cell>
      <Cell>{media.uploaded_by.name}</Cell>
    </Container>
  );
}

export function MediaRowSkeleton() {
  return <Skeleton height={48} width={"100%"} borderRadius={8} />;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 40px;
  min-width: 0;
  width: 100%;
  padding: 8px 0;

  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  .media-id-column {
    max-width: 50px;
  }

  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Cell = styled.span`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 0;
  max-width: 120px;
  gap: 8px;
`;

const NameColumn = styled(Cell)`
  flex: 3;
  justify-content: flex-start;
  max-width: 360px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1rem;

  > svg {
    flex-shrink: 0;
  }
`;

const AlbumColumn = styled(Cell)`
  flex: 2;
  max-width: 200px;
`;

const TagsColumn = styled(Cell)`
  flex: 2.5;
  max-width: 300px;
`;

const HeaderRow = styled(Container)`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1rem;
  font-weight: 600;

  > span {
    justify-content: center;
  }

  &:hover {
    transform: none;
    cursor: default;
  }
`;
