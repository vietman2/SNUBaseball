import styled from "styled-components";

import type { AlbumType } from "../models/album";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";
import { ImagePlaceholder, ProgressiveImage } from "@shared/ui/Images";
import { Skeleton } from "@shared/ui/Loading";

interface Props {
  album: AlbumType;
  isActive?: boolean; // 선택된 앨범인지 여부 (선택된 앨범은 강조 표시)
}

export function AlbumCard({ album, isActive = false }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Container>
      <ImageWrapper $isActive={isActive}>
        {album.cover_image_url ? (
          <ProgressiveImage src={album.cover_image_url} alt={album.title} />
        ) : (
          <ImagePlaceholder label="빈 앨범" />
        )}
        {isActive && (
          <AppIcon icon="check" size={48} color={colors.secondary} />
        )}
      </ImageWrapper>
      <Label>
        {album.title}
        {album.members_only && (
          <AppIcon icon="lock" size={16} color={colors.textSecondary} />
        )}
      </Label>
    </Container>
  );
}

export function AlbumCardSkeleton() {
  return (
    <Container>
      <Skeleton width={160} height={160} borderRadius={16} />
      <Skeleton width={100} height={32} borderRadius={4} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  &:hover {
    // hover하면 내부의 이미지가 살짝 커지도록
    transform: scale(1.03);
    transition: transform 0.2s;
  }
`;

const ImageWrapper = styled.div<{ $isActive?: boolean }>`
  width: 140px;
  height: 140px;
  border-radius: 16px;
  overflow: hidden;

  position: relative;

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  > :not(svg) {
    width: 100%;
    height: 100%;
    object-fit: cover;

    transition: transform 0.2s ease, filter 0.2s ease;

    filter: ${({ $isActive }) =>
      $isActive ? "blur(3px) brightness(0.8)" : "none"};
    will-change: filter;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  word-break: break-all;
`;
