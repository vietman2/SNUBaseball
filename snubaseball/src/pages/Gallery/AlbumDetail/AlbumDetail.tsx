import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { LoadingPage } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { colors } from "@contexts/theme";
import { MediaSimple } from "@fragments/Albums";
import { MediaType } from "@models/archive";
import { getAlbumImages } from "@services/archive";

export function AlbumDetail() {
  const [files, setFiles] = useState<MediaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getData = async () => {
      if (!albumId) {
        return;
      }

      setLoading(true);

      const files = await getAlbumImages(albumId);

      if (files) {
        setFiles(files);
      }

      setLoading(false);
    };

    getData();
  }, [albumId]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <Wrapper>
        <button onClick={goBack} data-testid="back">
          <AppIcon
            icon="chevron-left"
            size={24}
            color={colors.mediumEmphasis}
          />
          목록
        </button>
        <MediaList>
          {files.map((file) => (
            <button key={file.id}>
              <MediaSimple media={file} />
            </button>
          ))}
        </MediaList>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;

  > button {
    display: flex;
    align-items: center;
    gap: 4px;

    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.highEmphasis};

    cursor: pointer;
  }
`;

const MediaList = styled.div`
  column-count: 4;
  column-gap: 16px;

  @media (max-width: 1280px) {
    column-count: 3;
    column-gap: 16px;
  }

  > button {
    display: inline-block;
    overflow: hidden;
    position: relative;

    > span:first-child {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }

    > span:nth-child(2) {
      display: block;
      align-items: center;
      justify-content: center;
      padding: 2px 4px;
      position: absolute;
      bottom: 24px;
      right: 8px;

      font-size: 0.7rem;
      color: ${({ theme }) => theme.colors.background300};

      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 4px;
      z-index: 10;
    }
  }
`;
