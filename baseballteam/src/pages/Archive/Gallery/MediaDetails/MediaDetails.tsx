import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorPage, Loading } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { useAuth } from "@contexts/auth";
import { useGallery } from "@contexts/gallery";
import { useTheme } from "@contexts/theme";
import { AlbumMenu, TagMenu, PersonMenu } from "@fragments/Gallery";
import { AlbumType, MediaDetailType, MediaTagType } from "@models/archive";
import { MemberMiniType } from "@models/user";
import {
  getMediaDetails,
  deleteMedia,
  setAlbum,
  addOrRemovePerson,
  addOrRemoveTag,
} from "@services/archive";

export function MediaDetails() {
  const [infoMode, setInfoMode] = useState<boolean>(false);
  const [media, setMedia] = useState<MediaDetailType | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [albumMenuVisible, setAlbumMenuVisible] = useState<boolean>(false);
  const [tagMenuVisible, setTagMenuVisible] = useState<boolean>(false);
  const [personMenuVisible, setPersonMenuVisible] = useState<boolean>(false);

  const { user } = useAuth();
  const { albums, allTags, people, memberQuery, setMemberQuery, update } =
    useGallery();
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { mediaId } = useParams();

  const handleClose = () => {
    setMedia(null);
    setInfoMode(false);
    navigate("/archive/gallery");
  };

  const handleInfoClick = () => {
    setInfoMode((prev) => !prev);
  };

  const canEdit = user?.is_admin || user?.person_id === media?.uploaded_by.id;

  const toggleAlbumModal = () => {
    setAlbumMenuVisible(!albumMenuVisible);
  };

  const toggleTagModal = () => {
    setTagMenuVisible(!tagMenuVisible);
  };

  const togglePersonModal = () => {
    setPersonMenuVisible(!personMenuVisible);
  };

  useEffect(() => {
    const fetchMediaDetails = async () => {
      if (!mediaId) return;

      setLoading(true);
      const response = await getMediaDetails(parseInt(mediaId));

      if (response) {
        // set selected media based on type from response
        setMedia(response);
      }

      setLoading(false);
    };

    fetchMediaDetails();
  }, [mediaId]);

  if (loading) {
    return <Loading />;
  }

  if (!media) {
    return <ErrorPage />;
  }

  const handleAlbumSelect = async (album: AlbumType | null) => {
    if (!album) return;

    const response = await setAlbum(media.base_id, album.id);
    if (response) {
      setMedia(response);
      setAlbumMenuVisible(false);
    } else {
      window.alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleTagSelect = async (tag: MediaTagType) => {
    const response = await addOrRemoveTag(media.base_id, tag.id);
    if (response) {
      setMedia(response);
    } else {
      window.alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handlePersonSelect = async (person: MemberMiniType) => {
    const response = await addOrRemovePerson(media.base_id, person.id);
    if (response) {
      setMedia(response);
    } else {
      window.alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("이미지를 삭제하시겠습니까?")) {
      const response = await deleteMedia(media.base_id);

      if (response) {
        update();
        handleClose();
      }
    }
  };

  return (
    <Container>
      <Overlay
        onClick={handleClose}
        $display={!infoMode}
        data-testid="close-media-modal"
      >
        <EmbelModal onClick={(e) => e.stopPropagation()} data-testid="media">
          <button onClick={handleInfoClick} data-testid="media-info">
            <AppIcon icon="info" size={24} color="#E8E6F2" />
          </button>
          {media.type === "이미지" ? (
            <img src={media.url} alt={media.url} />
          ) : (
            <video controls>
              <source src={media.url} type="video/mp4" />
            </video>
          )}
        </EmbelModal>
      </Overlay>
      <InfoModal $display={infoMode}>
        <InfoContainer>
          <Header>
            <div>
              <AppIcon
                icon={media.type === "이미지" ? "image" : "video"}
                size={24}
                color={colors.primary}
              />
              <span>{media.title}</span>
            </div>
            <div>
              <button onClick={handleClose}>
                <AppIcon icon="close" size={24} color="#FF4040" />
              </button>
            </div>
          </Header>
          <Divider color={colors.borderDark} />
          <Contents>
            <Wrapper>
              <div>
                <span>앨범</span>
                {canEdit && (
                  <button onClick={toggleAlbumModal} data-testid="album-menu">
                    <AppIcon
                      icon="settings"
                      size={16}
                      color={colors.foreground900}
                    />
                  </button>
                )}
              </div>
              <div>
                <Chip>
                  <AppIcon icon="album" size={16} color={colors.primary} />
                  {media.album?.title}
                </Chip>
              </div>
              {albumMenuVisible && (
                <AlbumMenu
                  albums={albums}
                  selectedAlbum={media.album}
                  handleSelect={handleAlbumSelect}
                  toggleMenu={toggleAlbumModal}
                />
              )}
            </Wrapper>
            <Divider color={colors.borderDark} />
            <Wrapper>
              <div>
                <span>태그</span>
                {canEdit && (
                  <button onClick={toggleTagModal} data-testid="tag-menu">
                    <AppIcon
                      icon="settings"
                      size={16}
                      color={colors.foreground900}
                    />
                  </button>
                )}
              </div>
              <div>
                {media.tags.length === 0 && <span>태그 없음</span>}
                {media.tags.map((tag) => (
                  <Chip key={tag.id}>
                    <AppIcon icon="tag" size={16} color={colors.primary} />
                    {tag.name}
                  </Chip>
                ))}
              </div>
              {tagMenuVisible && (
                <TagMenu
                  allTags={allTags}
                  selectedTags={media.tags}
                  selectTag={handleTagSelect}
                  toggleMenu={toggleTagModal}
                />
              )}
            </Wrapper>
            <Divider color={colors.borderDark} />
            <Wrapper>
              <div>
                <span>인물</span>
                {canEdit && (
                  <button onClick={togglePersonModal} data-testid="person-menu">
                    <AppIcon
                      icon="settings"
                      size={16}
                      color={colors.foreground900}
                    />
                  </button>
                )}
              </div>
              <div>
                {media.people.length === 0 && <span>인물 없음</span>}
                {media.people.map((person) => (
                  <Chip key={person.id}>
                    <AppIcon icon="person" size={16} color={colors.primary} />
                    {person.full_name}
                  </Chip>
                ))}
              </div>
              {personMenuVisible && (
                <PersonMenu
                  people={people}
                  selectedPeople={media.people}
                  selectPerson={handlePersonSelect}
                  toggleMenu={togglePersonModal}
                  searchQuery={memberQuery}
                  setSearchQuery={setMemberQuery}
                />
              )}
            </Wrapper>
          </Contents>
          <Footer>
            <button onClick={handleDelete} data-testid="delete-media">
              <AppIcon icon="delete" size={24} color={colors.background100} />
              <span>삭제</span>
            </button>
          </Footer>
        </InfoContainer>
      </InfoModal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
`;

const Overlay = styled.div<{ $display: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    display: ${({ $display }) => ($display ? "flex" : "none")};
  }
`;

const EmbelModal = styled.div`
  display: flex;
  max-width: 70vw;
  max-height: 90vh;
  align-items: center;
  justify-content: center;
  position: relative;

  cursor: default;

  > button:first-child {
    position: absolute;
    top: -32px;
    right: -16px;

    color: #fff;

    @media (min-width: 768px) {
      display: none;
    }
  }

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

const InfoModal = styled.div<{ $display: boolean }>`
  display: flex;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.background100};

  @media (max-width: 768px) {
    display: ${({ $display }) => ($display ? "flex" : "none")};
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 20vw;
  padding: 24px 16px;
  gap: 24px;

  overflow: hidden;

  @media (max-width: 1440px) {
    width: 24vw;
  }

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background100};
  color: ${({ theme }) => theme.colors.primary};

  > div:first-child {
    display: flex;
    flex: 1;
    align-items: center;
    max-width: 95%;
    gap: 4px;

    > span {
      display: inline-block;

      font-size: 0.925rem;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  > div:last-child {
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > div:nth-child(2) {
    display: flex;
    gap: 8px;
  }

  span {
    font-size: 0.925rem;
    color: ${({ theme }) => theme.colors.foreground900};
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;

  > button {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 8px;

    padding: 8px 16px;
    background-color: #ff4848;
    color: ${({ theme }) => theme.colors.background100};
    border-radius: 4px;
  }
`;

const Chip = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  gap: 4px;

  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};

  background-color: ${({ theme }) => theme.colors.background700};
  border-radius: 4px;
`;
