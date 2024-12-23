import styled from "styled-components";

interface Props {
  videoId: string;
  width?: string;
  height?: string;
}

export function IFrame({ videoId }: Readonly<Props>) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <Container>
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Container>
  );
}

const Container = styled.div`
  > iframe {
    width: 100%;
    height: 24vh;

    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
    }
  }
`;
