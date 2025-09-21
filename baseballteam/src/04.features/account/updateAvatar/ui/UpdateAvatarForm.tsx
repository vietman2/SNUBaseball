import styled from "styled-components";

import { useAvatarForm } from "../hooks/useAvatarForm";
import { SingleFileInput } from "@shared/ui/Inputs";
import { Spinner } from "@shared/ui/Loading";
import { ErrorText } from "@shared/ui/Texts";

interface Props {
  memberId: number;
  originalImageUrl: string | null;
  postUpload: () => void;
}

export function UpdateAvatarForm({
  memberId,
  originalImageUrl,
  postUpload,
}: Readonly<Props>) {
  const { file, setFile, submitting, errorMsg, setErrorMsg, submit } =
    useAvatarForm({ memberId, postUpload });

  return (
    <Container onSubmit={submit}>
      <HeaderRow>
        <h2>프로필 이미지 변경</h2>
      </HeaderRow>
      <Grid>
        <Panel>
          <PanelTitle>현재 이미지</PanelTitle>
          <CurrentImageBox>
            <img
              src={
                originalImageUrl ??
                "https://cdn.snubaseball.co.kr/images/default_profile.png"
              }
              alt="현재 프로필 이미지"
            />
          </CurrentImageBox>
        </Panel>
        <Panel>
          <PanelTitle>새 이미지</PanelTitle>
          <SingleFileInput
            value={file}
            onChange={setFile}
            onError={setErrorMsg}
            defaultPreviewUrl={null} // 새 이미지는 업로드 영역에서만 표시
            disabled={submitting}
          />
        </Panel>
      </Grid>
      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
      <SubmitButton type="submit" disabled={submitting}>
        {submitting ? <Spinner /> : "업로드"}
      </SubmitButton>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;

  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  border-radius: 16px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PanelTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CurrentImageBox = styled.div`
  width: 100%;
  min-height: 180px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surfaceElevated};
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    width: 100%;
    max-height: 180px;
    object-fit: cover;
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 600;
  border: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
