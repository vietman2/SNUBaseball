import { useEffect, useState } from "react";
import styled from "styled-components";

import { AppIcon } from "@shared/ui/Icons";

interface Props {
  src: string;
  alt: string;
  type?: "IMAGE" | "VIDEO";
  timeoutMs?: number;
}

export function ProgressiveImage({
  src,
  alt,
  type = "IMAGE",
  timeoutMs = 5000,
}: Readonly<Props>) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [errored, setErrored] = useState<boolean>(false);
  const [isSlow, setIsSlow] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => setIsSlow(true), timeoutMs);
    return () => clearTimeout(t);
  }, [timeoutMs, src]);

  return (
    <Frame>
      {!loaded && !errored && (
        <Skeleton>{isSlow && <Badge>느린 네트워크…</Badge>}</Skeleton>
      )}
      {!errored && (
        <ImageWrapper>
          <Img
            $visible={loaded}
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            loading="lazy"
            decoding="async"
          />
          {type === "VIDEO" && <AppIcon icon="video" size={24} color="white" />}
        </ImageWrapper>
      )}
      {errored && (
        <Fallback>
          <span>데이터를 불러오지 못했습니다</span>
        </Fallback>
      )}
    </Frame>
  );
}

const Frame = styled.div`
  min-width: 120px;
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray200};
`;

const Skeleton = styled.div`
  position: absolute;
  inset: 0;
  animation: pulse 1.2s ease-in-out infinite;
  @keyframes pulse {
    0%,
    100% {
      background: rgba(0, 0, 0, 0.06);
    }
    50% {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

const Badge = styled.div`
  position: absolute;
  left: 8px;
  bottom: 8px;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.55);
  color: white;
`;

const ImageWrapper = styled.div`
  position: relative;
  inset: 0;
  width: 100%;
  height: 100%;

  > svg {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    opacity: 0.75;
  }
`;

const Img = styled.img<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 240ms ease;
`;

const Fallback = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.gray700};
`;
