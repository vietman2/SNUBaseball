import { useState } from "react";
import styled from "styled-components";

import { useGallery } from "@contexts/gallery";
import { AlbumType } from "@models/archive";
import { createTag, createAlbum, updateAlbum } from "@services/archive";

interface AlbumProps {
  selectedAlbum: AlbumType | null;
  toggleModal: () => void;
}

export function AlbumModal({
  selectedAlbum,
  toggleModal,
}: Readonly<AlbumProps>) {
  const [titleInput, setTitleInput] = useState<string>(
    selectedAlbum ? selectedAlbum.title : ""
  );
  const [membersOnly, setMembersOnly] = useState<boolean>(
    selectedAlbum ? selectedAlbum.members_only : false
  );

  const { update } = useGallery();

  const handleSubmit = async () => {
    if (selectedAlbum) {
      const result = await updateAlbum(
        selectedAlbum.id,
        titleInput,
        membersOnly
      );
      if (result) {
        toggleModal();
        update();
      } else {
        window.alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      const result = await createAlbum(titleInput, membersOnly);
      if (result) {
        toggleModal();
        update();
      } else {
        window.alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <Overlay onClick={toggleModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Container>
          <span>{selectedAlbum ? "앨범 수정" : "앨범 추가"}</span>
          <InputWrapper>
            <label htmlFor="title">앨범 제목</label>
            <input
              id="title"
              type="text"
              placeholder="앨범 이름을 입력하세요"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              data-testid="album-title-input"
            />
          </InputWrapper>
          <CheckboxWrapper>
            <label htmlFor="title">부원들에게만 공개</label>
            <input
              id="membersOnly"
              type="checkbox"
              checked={membersOnly}
              onChange={(e) => setMembersOnly(e.target.checked)}
              data-testid="checkbox"
            />
          </CheckboxWrapper>
          <button onClick={handleSubmit} data-testid="submit-album">
            {selectedAlbum ? "저장" : "앨범 만들기"}
          </button>
        </Container>
      </Modal>
    </Overlay>
  );
}

interface TagProps {
  toggleModal: () => void;
}

export function TagModal({ toggleModal }: Readonly<TagProps>) {
  const [tagName, setTagName] = useState<string>("");

  const { update } = useGallery();

  const handleSubmit = async () => {
    if (!tagName) {
      alert("태그 이름을 입력하세요");
      return;
    }

    const response = await createTag(tagName);

    if (response) {
      toggleModal();
      update();
    } else {
      window.alert("태그 추가에 실패했습니다");
    }
  };

  return (
    <Overlay onClick={toggleModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Container>
          <span>태그 추가</span>
          <InputWrapper>
            <label htmlFor="tag">태그 이름</label>
            <input
              id="tag"
              type="text"
              placeholder="태그 이름을 입력하세요"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              data-testid="tag-name-input"
            />
          </InputWrapper>
          <button onClick={handleSubmit} data-testid="submit-tag">
            태그 추가
          </button>
        </Container>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: row;

  cursor: default;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  padding: 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};

  > span {
    align-self: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground900};
  }

  > button {
    width: 100%;
    padding: 8px 16px;

    color: ${({ theme }) => theme.colors.background100};
    font-size: 1rem;
    font-weight: 600;

    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > label {
    padding: 0 4px;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground700};
  }

  > input {
    width: 100%;
    padding: 8px 12px;

    font-size: 0.85rem;
    font-weight: 600;

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.foreground900};
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  > input {
    width: 16px;
    height: 16px;
  }

  > label {
    padding: 0 4px;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.foreground700};
  }
`;
