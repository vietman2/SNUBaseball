import styled from "styled-components";

import type { AlbumType } from "../models/album";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";
import { ImagePlaceholder } from "@shared/ui/Images";
import { Skeleton } from "@shared/ui/Loading";

interface Props {
  album: AlbumType;
}

export function AlbumCard({ album }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Container>
      {album.cover_images.length > 0 ? (
        <Image src={album.cover_images[0].url} alt={album.title} />
      ) : (
        <ImagePlaceholder
          width="200px"
          height="200px"
          borderRadius="16px"
          label="빈 앨범"
        />
      )}
      <span>
        {album.title}
        {album.members_only && (
          <AppIcon icon="lock" size={16} color={colors.textSecondary} />
        )}
      </span>
    </Container>
  );
}

export function AlbumCardSkeleton() {
  return (
    <Container>
      <Skeleton width={200} height={200} borderRadius={16} />
      <Skeleton width={100} height={32} borderRadius={4} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  > span {
    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    text-align: center;
    word-break: break-all;
  }

  &:hover {
    // hover하면 내부의 이미지가 살짝 커지도록
    transform: scale(1.03);
    transition: transform 0.2s;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 16px;
  object-fit: cover;
`;
