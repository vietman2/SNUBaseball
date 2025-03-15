import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ErrorPage, LoadingPage } from "@components/Fallbacks";
import { useGallery } from "@contexts/gallery";

export function MediaDetail() {
  const { media, loading } = useGallery();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container>
        <LoadingPage />
      </Container>
    );
  }

  return (
    <Container onClick={handleClose} data-testid="close-modal">
      <EmbelModal onClick={(e) => e.stopPropagation()} data-testid="media">
        {media ? (
          <>
            {media.type === "이미지" ? (
              <img src={media.url} alt={media.url} />
            ) : (
              <video controls>
                <source src={media.url} type="video/mp4" />
              </video>
            )}
          </>
        ) : (
          <ErrorPage message="오류가 발생했습니다." onClick={handleClose} />
        )}
      </EmbelModal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
`;

const EmbelModal = styled.div`
  display: flex;
  max-width: 70vw;
  max-height: 90vh;
  align-items: center;
  justify-content: center;
  position: relative;

  cursor: default;

  > img {
    display: block;
    max-width: 80vw;
    max-height: 65vh;
  }

  > video {
    display: block;
    max-width: 80vw;
    max-height: 65vh;
  }
`;
