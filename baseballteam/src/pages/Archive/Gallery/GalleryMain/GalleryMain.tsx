import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { useAuth } from "@contexts/auth";
import { useGallery } from "@contexts/gallery";
import { useTheme } from "@contexts/theme";
import {
  AlbumPreview,
  FilterModal,
  MediaSimple,
  UploadModal,
} from "@fragments/Gallery";
import {
  AlbumType,
  MediaResponseType,
  MediaType,
  MediaTagType,
} from "@models/archive";
import { MemberMiniType } from "@models/user";
import { getFiles } from "@services/archive";

export function GalleryMain() {
  const [mediaResponse, setMediaResponse] = useState<MediaResponseType | null>(
    null
  );
  const [files, setFiles] = useState<MediaType[]>([]);

  // Filters
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
  const [selectedTag, setSelectedTag] = useState<MediaTagType | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<MemberMiniType | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const { albums } = useGallery();
  const { colors } = useTheme();
  const navigate = useNavigate();

  const toggleUploadModal = () => {
    setUploadModalVisible((prev) => !prev);
  };

  const toggleFilterModal = () => {
    setFilterModalVisible((prev) => !prev);
  };

  const navigateToAlbums = () => {
    if (user?.is_admin) {
      navigate("./albums");
    }
  };

  const navigateToMediaDetail = (media: MediaType) => {
    navigate(`/archive/gallery/${media.id.toString()}`);
  };

  const loadData = async (
    albumId: number | undefined,
    tagId: number | undefined,
    personId: number | undefined
  ) => {
    setLoading(true);

    const response = await getFiles(albumId, tagId, personId);

    if (response) {
      setMediaResponse(response);
      setFiles(response.results);
    }

    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadData(selectedAlbum?.id, selectedTag?.id, selectedPerson?.id);
  }, [selectedAlbum, selectedTag, selectedPerson]);

  const loadMoreData = useCallback(async () => {
    if (mediaResponse && mediaResponse.next && !loading) {
      setLoading(true);
      try {
        const response = await axios.get(mediaResponse.next);
        setMediaResponse(response.data);
        setFiles((prev) => [...prev, ...response.data.results]);
      } catch {
        // Do nothing
      }
      setLoading(false);
    }
  }, [mediaResponse, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 0.2 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observerRef, loadMoreData]);

  return (
    <>
      <Container>
        <AlbumsWrapper $display={selectedAlbum === null}>
          <Horizontal>
            <span>앨범</span>
            <button onClick={navigateToAlbums} data-testid="album-list">
              <AppIcon icon="settings" size={24} color={colors.foreground900} />
            </button>
          </Horizontal>
          <List>
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => setSelectedAlbum(album)}
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
              <button onClick={() => setSelectedAlbum(null)} data-testid="back">
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
                <span>필터</span>
              </FilterButton>
              <button onClick={toggleUploadModal} data-testid="upload">
                <AppIcon icon="plus" size={18} color="#FAF9F6" />
                <span>업로드</span>
              </button>
            </div>
          </Header>
          <MediaList>
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => navigateToMediaDetail(file)}
                data-testid={`media-${file.id}`}
              >
                <MediaSimple media={file} />
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
      {filterModalVisible && (
        <FilterModal
          selectedTag={selectedTag}
          selectedMember={selectedPerson}
          setSelectedTag={setSelectedTag}
          setSelectedMember={setSelectedPerson}
          toggleModal={toggleFilterModal}
        />
      )}
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

  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};

  > button {
    display: flex;
    align-items: center;
    gap: 4px;
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

    @media (max-width: 768px) {
      span {
        display: none;
      }
    }
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

  @media (max-width: 768px) {
    font-size: 1.2rem;
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
