import styled from "styled-components";

import { useAlbumList } from "./_contexts";

export function AlbumModal() {
  const { toggleModal, modalActions } = useAlbumList();

  return (
    <Overlay onClick={toggleModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Container>
          <span>{modalActions.selectedAlbum ? "앨범 수정" : "앨범 추가"}</span>
          <InputWrapper>
            <label htmlFor="title">앨범 제목</label>
            <input
              id="title"
              type="text"
              placeholder="앨범 이름을 입력하세요"
              value={modalActions.titleInput}
              onChange={(e) => modalActions.setTitleInput(e.target.value)}
              data-testid="album-title-input"
            />
          </InputWrapper>
          <CheckboxWrapper>
            <label htmlFor="title">부원들에게만 공개</label>
            <input
              id="membersOnly"
              type="checkbox"
              checked={modalActions.membersOnly}
              onChange={(e) => modalActions.setMembersOnly(e.target.checked)}
              data-testid="checkbox"
            />
          </CheckboxWrapper>
          <button
            onClick={modalActions.handleSubmit}
            data-testid="submit-album"
          >
            {modalActions.selectedAlbum ? "저장" : "앨범 만들기"}
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
