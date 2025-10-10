"use client";

import Image from "next/image";
import styled from "styled-components";

import { MediaType } from "../models/media";
import { AppIcon } from "@shared/ui/Icons";
import { Skeleton } from "@shared/ui/Loading";

interface Props {
  media: MediaType;
}

export function MediaCard({ media }: Readonly<Props>) {
  return (
    <Card>
      {media.type === "IMAGE" ? (
        <Image
          src={media.url}
          alt={media.filename}
          fill
          sizes="(min-width: 768px) 15vw, (min-width: 480px) 20vw, 30vw"
        />
      ) : (
        <>
          <Image
            src={media.thumbnail_url}
            alt={media.filename}
            fill
            sizes="(min-width: 768px) 15vw, (min-width: 480px) 20vw, 30vw"
          />
          <AppIcon icon="play" size={32} color="#ffffff" />
        </>
      )}
    </Card>
  );
}

export function MediaCardSkeleton() {
  return (
    <Card>
      <Skeleton width="100%" height="100%" borderRadius={8} />
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0.8;
  }
`;
