import { useEffect, useState } from "react";
import styled from "styled-components";

import { useProfileImageMutation } from "../api/updateImage";
import { SingleFileInput } from "@shared/ui/Inputs";
import { Spinner } from "@shared/ui/Loading";

interface Props {
  memberId: number;
  originalImageUrl: string | null;
  postUpload: () => void;
}

export function UpdateImageModal({
  memberId,
  originalImageUrl,
  postUpload,
}: Readonly<Props>) {
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: uploadFile } = useProfileImageMutation(memberId);

  const MAX_SIZE_MB = 10;

  const handleError = (msg: string) => setError(msg);

  const handleUpload = async () => {
    if (!file) {
      setError("업로드할 파일을 선택해주세요.");
      return;
    }

    setSubmitting(true);
    setError(null);

    uploadFile(file, {
      onSuccess: (result) => {
        if (result.status !== "SUCCESS") {
          setError(
            result.message
          );
          setSubmitting(false);
          return;
        }

        setSubmitting(false);
        postUpload();
      },
    });
  };

  useEffect(() => {
    // 새 파일이 선택되면 에러 메시지 정리
    if (file) setError(null);
  }, [file]);

  return (
    <Container>
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
            onError={handleError}
            defaultPreviewUrl={null} // 새 이미지는 업로드 영역에서만 표시
            maxSizeMB={MAX_SIZE_MB}
            disabled={submitting}
          />
          <Hint>최대 {MAX_SIZE_MB}MB</Hint>
        </Panel>
      </Grid>
      {error && <ErrorText>{error}</ErrorText>}
      <PrimaryButton type="button" onClick={handleUpload} disabled={submitting}>
        {submitting ? <Spinner /> : "업로드"}
      </PrimaryButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;

  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  border-radius: 16px;

  > h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  > button {
    padding: 8px 16px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
  }

  .update-profile-error-message {
    font-size: 0.875rem;
    text-align: right;
    color: ${({ theme }) => theme.colors.error};
  }
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
    flex: 1;
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
  background: ${({ theme }) => theme.colors.backgroundPaper};
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    width: 100%;
    max-height: 180px;
    object-fit: cover;
  }
`;

const Hint = styled.p`
  margin: 0;
  font-size: 0.85rem;
  text-align: right;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  text-align: right;
  color: ${({ theme }) => theme.colors.error};
`;

const PrimaryButton = styled.button`
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
