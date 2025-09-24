import styled from "styled-components";

import { useAlbumForm } from "../contexts/useAlbumForm";

export function AlbumFormInputs() {
  const { title, setTitle, membersOnly, setMembersOnly } = useAlbumForm();

  return (
    <Container>
      <TitleInputWrapper>
        <label htmlFor="title">앨범 제목</label>
        <input
          id="title"
          type="text"
          placeholder="앨범 이름을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          data-testid="album-title-input"
        />
      </TitleInputWrapper>
      <CheckboxWrapper>
        <label htmlFor="membersOnly">부원 전용</label>
        <input
          id="membersOnly"
          type="checkbox"
          checked={membersOnly}
          onChange={(e) => setMembersOnly(e.target.checked)}
          data-testid="album-members-only-checkbox"
        />
        <p>체크 시 포털에서만 조회 가능합니다</p>
      </CheckboxWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 4px;

  label {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const TitleInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  input[type="text"] {
    flex: 1;
    height: 40px;
    padding: 8px 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 8px;
    font-size: 14px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray400};
    }
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }

  p {
    margin-left: 8px;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.warning};
  }
`;
