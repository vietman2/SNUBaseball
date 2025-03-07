import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AlbumPreview, MediaPreview } from "../_components";
import { useAlbum, useMedia, useMember, useTag } from "../_contexts";
import { FilterModal, UploadModal } from "../_modals";
import { Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { useAuth } from "@contexts/auth";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { AlbumType } from "@models/archive";

export function GalleryMain() {
  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { albums, selectedAlbum, selectAlbum } = useAlbum();
  const { files, loading, reloadData, loadMoreData, selectMedia } = useMedia();
  const { selectedPerson } = useMember();
  const { selectedTag } = useTag();
  const observerRef = useIntersectionObserver<HTMLDivElement>(loadMoreData, {
    threshold: 0.2,
  });

  const handleAlbumListClick = () => {
    if (user?.is_admin) {
      navigate("./albums");
    }
  };

  const handleAlbumClick = (album: AlbumType) => {
    if (!loading) {
      selectAlbum(album);
    }
  };

  const toggleUploadModal = () => {
    setUploadModalVisible((prev) => !prev);
  };

  const toggleFilterModal = () => {
    setFilterModalVisible((prev) => !prev);
  };

  useEffect(() => {
    reloadData(selectedAlbum?.id, selectedTag?.id, selectedPerson?.id);
  }, [selectedAlbum, selectedTag, selectedPerson]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container>
        <AlbumsWrapper $display={selectedAlbum === null}>
          <Horizontal>
            <button onClick={handleAlbumListClick} data-testid="album-list">
              앨범 <AppIcon icon="chevron-right" size={24} color="#6C757D" />
            </button>
          </Horizontal>
          <List>
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => handleAlbumClick(album)}
                data-testid={`album-${album.id}`}
              >
                <AlbumPreview album={album} />
              </button>
            ))}
          </List>
        </AlbumsWrapper>
        <MediaWrapper>
          <Header>
            <BreadCrumb>
              <button onClick={() => selectAlbum(null)} data-testid="back">
                <AppIcon icon="album" size={24} color="#0B1623" />
                갤러리
              </button>
              {selectedAlbum && (
                <>
                  <AppIcon icon="chevron-right" size={24} color="#6C757D" />
                  <AppIcon icon="album" size={24} color="#0B1623" />
                  {selectedAlbum.title}
                </>
              )}
            </BreadCrumb>
            <div>
              <FilterButton onClick={toggleFilterModal} data-testid="filter">
                <AppIcon icon="filter" size={18} color="#0F0F70" />
                필터
              </FilterButton>
              <button onClick={toggleUploadModal} data-testid="upload">
                <AppIcon icon="plus" size={18} color="#FAF9F6" />
                업로드
              </button>
            </div>
          </Header>
          <MediaList>
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => selectMedia(file)}
                data-testid={`media-${file.id}`}
              >
                <MediaPreview media={file} />
              </button>
            ))}
            <div
              ref={observerRef}
              style={{ height: "50px" }}
              data-testid="observer"
            />
          </MediaList>
          {loading && <Loading />}
        </MediaWrapper>
      </Container>
      {uploadModalVisible && <UploadModal toggleModal={toggleUploadModal} />}
      {filterModalVisible && <FilterModal toggleModal={toggleFilterModal} />}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
`;

const AlbumsWrapper = styled.div<{ $display: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: ${({ $display }) => ($display ? "50%" : "0")};
  margin-bottom: ${({ $display }) => ($display ? "36px" : "0")};
  gap: 16px;
  overflow: hidden;

  transition: max-height 0.5s;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;

  @media (max-width: 768px) {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
`;

const Horizontal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > button {
    display: flex;
    align-items: center;
    gap: 4px;

    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground900};
  }
`;

const MediaWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.background100};

  button {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 8px;
    gap: 4px;

    color: ${({ theme }) => theme.colors.background100};
    background-color: ${({ theme }) => theme.colors.primary};

    cursor: pointer;
  }

  > div:last-child {
    display: flex;
    gap: 8px;
  }

  @media (max-width: 768px) {
    background-color: #ffffff;
  }
`;

const BreadCrumb = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};

  > button {
    padding: 0;
    color: ${({ theme }) => theme.colors.foreground900};
    background-color: transparent;
  }
`;

const FilterButton = styled.button`
  color: ${({ theme }) => theme.colors.foreground900} !important;
  background-color: ${({ theme }) => theme.colors.background100} !important;
  border: 1px solid ${({ theme }) => theme.colors.primary};
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
