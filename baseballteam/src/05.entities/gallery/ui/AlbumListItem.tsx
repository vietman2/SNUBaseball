import styled from "styled-components";

import type { AlbumType } from "../models/album";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";
import { Skeleton } from "@shared/ui/Loading";

export function AlbumListHeaderItem() {
  const { colors } = useColors();

  return (
    <HeaderRow>
      <span className="album-id-column"></span>
      <span className="album-title-column">앨범 이름</span>
      <span><AppIcon icon="image" size={16} color={colors.textSecondary} /></span>
      <span><AppIcon icon="video" size={16} color={colors.textSecondary} /></span>
    </HeaderRow>
  );
}

interface Props {
  album: AlbumType;
}

export function AlbumListItem({ album }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Container>
      <span className="album-id-column">{album.id}</span>
      <span className="album-title-column">
        {album.title}
        {album.members_only && (
          <AppIcon icon="lock" size={16} color={colors.textSecondary} />
        )}
      </span>
      <span>{album.num_images}</span>
      <span>{album.num_videos}</span>
    </Container>
  );
}

export function AlbumListItemSkeleton() {
  return <Skeleton width="100%" height={20} borderRadius={4} />;
}

const Container = styled.div`
  display: flex;
  flex: 1;
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

    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    word-break: break-all;
  }

  .album-id-column {
    max-width: 50px;
  }

  .album-title-column {
    max-width: 300px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:hover {
    transform: scale(1.01);
    transition: transform 0.2s;
  }
`;

const HeaderRow = styled(Container)`
  font-weight: 600;

  &:hover {
    transform: none;
  }
`;
