import { useState } from "react";
import styled, { keyframes } from "styled-components";

import { AlbumType } from "@models/archive";

interface Props {
  album: AlbumType;
}

export function AlbumSimple({ album }: Readonly<Props>) {
  const [index, setIndex] = useState<number>(0);

  const handleAnimationEnd = () => {
    if (album.cover_images.length > 1) {
      const nextIndex = (index + 1) % album.cover_images.length;
      setIndex(nextIndex);
    }
  };

  return (
    <AlbumPreview>
      <div>
        {album.cover_images.length > 0 ? (
          <AnimatedImage
            key={album.cover_images[index].id}
            src={album.cover_images[index].url}
            alt={album.title}
            onAnimationEnd={handleAnimationEnd}
            data-testid="image"
          />
        ) : (
          <div />
        )}
      </div>
      <span>{album.title}</span>
    </AlbumPreview>
  );
}

const fadeOut = keyframes`
  from {
    opacity: 0.9;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const AnimatedImage = styled.img`
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
  opacity: 0.9;
  animation: ${fadeOut} 10s ease forwards;
`;

const AlbumPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  > div {
    min-width: 200px;
    max-width: 200px;
    min-height: 200px;
    max-height: 200px;

    box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.33);
    border-radius: 24px;
    background-color: ${({ theme }) => theme.colors.lowEmphasis};

    overflow: hidden;

    @media (max-width: 768px) {
      min-width: 120px;
      max-width: 120px;
      min-height: 120px;
      max-height: 120px;
    }
  }

  > span {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.highEmphasis};

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  img {
    max-height: 200px;
    object-fit: contain;
    border-radius: 8px;
    opacity: 0.9;
    animation: ${fadeOut} 5s ease forwards;

    @media (max-width: 768px) {
      max-height: 120px;
    }
  }
`;
