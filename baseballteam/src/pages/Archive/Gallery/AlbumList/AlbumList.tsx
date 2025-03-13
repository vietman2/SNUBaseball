import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { useGallery } from "@contexts/gallery";
import { useTheme } from "@contexts/theme";
import { AlbumModal, AlbumSimple, TagModal } from "@fragments/Gallery";
import { AlbumType } from "@models/archive";
import { removeAlbum } from "@services/archive";

export function AlbumList() {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);

  const [albumModal, setAlbumModal] = useState<boolean>(false);
  const [tagModal, setTagModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const { albums, allTags, refresh } = useGallery();
  const { colors } = useTheme();

  const goBack = () => {
    navigate("../");
  };

  const toggleAlbumModal = () => {
    setAlbumModal((prev) => !prev);
  };

  const toggleTagModal = () => {
    setTagModal((prev) => !prev);
  };

  const handleCreateAlbum = () => {
    setSelectedAlbum(null);
    toggleAlbumModal();
  };

  const handleEditAlbum = (album: AlbumType) => {
    setSelectedAlbum(album);
    toggleAlbumModal();
  };

  const handleDeleteAlbum = async (album: AlbumType) => {
    if (
      window.confirm(
        "정말 삭제하시겠습니까?\n앨범을 삭제하면, 앨범에 속한 모든 미디어는 미분류 앨범으로 이동합니다."
      )
    ) {
      const response = await removeAlbum(album.id);

      if (response) {
        refresh();
      } else {
        window.alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <>
      <Container>
        <div>
          <button onClick={goBack} data-testid="back">
            <AppIcon
              icon="chevron-left"
              size={24}
              color={colors.foreground300}
            />
          </button>
        </div>
        <Header>
          <span>앨범 목록</span>
          <button onClick={handleCreateAlbum} data-testid="open-album-modal">
            <AppIcon icon="plus" size={14} color="#0F0F70" />새 앨범
          </button>
        </Header>
        <List>
          {albums.map((album) => (
            <AlbumSimple
              key={album.id}
              album={album}
              onEdit={handleEditAlbum}
              onDelete={handleDeleteAlbum}
            />
          ))}
        </List>
        <Header>
          <span>태그 목록</span>
          <button onClick={toggleTagModal} data-testid="open-tag-modal">
            <AppIcon icon="plus" size={14} color="#0F0F70" />새 태그
          </button>
        </Header>
        <Tags>
          {allTags.map((tag) => (
            <TagChip key={tag.id}>
              <AppIcon icon="tag" size={14} color={colors.primary} />
              {tag.name}
            </TagChip>
          ))}
        </Tags>
      </Container>
      {albumModal && (
        <AlbumModal
          selectedAlbum={selectedAlbum}
          toggleModal={toggleAlbumModal}
        />
      )}
      {tagModal && <TagModal toggleModal={toggleTagModal} />}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  gap: 32px;

  button:first-child {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > span {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground900};
  }

  > button:last-child {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    gap: 4px;

    font-size: 0.825rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};

    background-color: ${({ theme }) => theme.colors.borderLight};
    border-radius: 8px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagChip = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;

  color: ${({ theme }) => theme.colors.foreground900};

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;
