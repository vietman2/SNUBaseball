import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { useWindowSize } from "@hooks/useWindowSize";
import { MediaType } from "@models/archive";

interface Props {
  media: MediaType;
}

export function MediaSimple({ media }: Readonly<Props>) {
  const { width } = useWindowSize();

  const getHeight = (file: MediaType) => {
    const ratio = file.height / file.width;

    if (width < 768) {
      return 28 * ratio + "vw";
    } else if (width < 1280) {
      return 24 * ratio + "vw";
    }
    return 20 * ratio + "vw";
  };

  const getDuration = (length: number | undefined) => {
    if (!length) return "0:00";

    const minutes = Math.floor(length / 60);
    const seconds = length % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      {media.type === "비디오" && (
        <>
          <span>
            <AppIcon icon="play" size={24} color="#0F0F70" />
          </span>
          <span>{getDuration(media.length)}</span>
        </>
      )}
      <Image
        src={media.url}
        alt={media.url}
        style={{
          height: getHeight(media),
          opacity: media.type === "비디오" ? 0.5 : 1,
        }}
      />
    </>
  );
}

const Image = styled.img`
  display: block;
  width: 20vw;
  margin-bottom: 16px;
  break-inside: avoid;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 1280px) {
    width: 24vw;
  }

  @media (max-width: 768px) {
    width: 28vw;
  }
`;
