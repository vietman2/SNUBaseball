"use client";

import Image from "next/image";
import styled from "styled-components";

import type { AlbumType } from "../models/album";
import { Skeleton } from "@shared/ui/Loading";

interface Props {
  album: AlbumType;
}

export function AlbumCard({ album }: Readonly<Props>) {
  return (
    <Container>
      <ImageWrapper>
        {album.cover_image_url ? (
          <Image
            src={album.cover_image_url}
            alt={album.title}
            fill
            sizes="(max-width: 600px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
            className="album-img"
          />
        ) : (
          <ImagePlaceholder>빈 앨범</ImagePlaceholder>
        )}
      </ImageWrapper>
      <Label>{album.title}</Label>
    </Container>
  );
}

export function AlbumCardSkeleton() {
  return (
    <Container>
      <ImageWrapper>
        <Skeleton width="100%" height="100%" borderRadius={16} />
      </ImageWrapper>
      <Label>
        <Skeleton width="60%" height={24} />
      </Label>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 320px;
  gap: 12px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  border-radius: 16px;
  overflow: hidden;

  .album-img {
    transition: transform 0.2s ease;
    will-change: transform;
  }

  &:hover .album-img {
    transform: scale(1.03);
  }
`;

const Label = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ImagePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.colors.textSecondary};

  background-color: ${({ theme }) => theme.colors.gray300};
  border-radius: 16px;
`;
