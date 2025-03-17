import styled from "styled-components";

import { AppIcon } from "@components/Icons";

interface Props {
  id: string;
  thumbnail: string;
  video: string | null;
}

export function InstagramContent({ id, thumbnail, video }: Readonly<Props>) {
  return (
    <Container>
      {video ? (
        <video controls>
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <a href={`https://www.instagram.com/p/${id}`} target="_blank" rel="noreferrer">
          <span>
            <AppIcon icon="instagram" size={24} color="#E1306C" />
            인스타에서 보기
          </span>
          <img
            src={thumbnail}
            alt="thumbnail"
          />
        </a>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  a {
    display: flex;
    flex-direction: column;
    gap: 8px;

    text-decoration: none;
  }

  span {
    display: flex;
    align-items: center;
    gap: 8px;

    color: ${({ theme }) => theme.colors.foreground900};
  }

  > video {
    width: 100%;
    height: 100%;
    max-height: 300px;
  }

  img {
    width: 100%;
    height: 100%;
    max-height: 300px;
    object-fit: cover;
  }
`;
