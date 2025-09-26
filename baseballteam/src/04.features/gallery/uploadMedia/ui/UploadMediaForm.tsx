import styled from "styled-components";

import { MediaDropArea } from "./MediaDropArea";
import { SelectedFiles } from "./SelectedFiles";
import { useUploadMediaForm } from "../contexts/useUploadMediaForm";
import { AlbumSelect, TagsSelect } from "@entities/gallery";
import { SubmitButton } from "@shared/ui/Buttons";

export function UploadMediaForm() {
  const { submit, progress, isReady } = useUploadMediaForm();

  return (
    <Form>
      <h2>파일 업로드</h2>
      <MetaSelectWrapper>
        <AlbumSelect />
        <TagsSelect />
      </MetaSelectWrapper>
      <MediaDropArea />
      <SelectedFiles />
      {progress > 0 && <ProgressBar $progress={progress} data-testid="progress-bar" />}
      <SubmitButton onClick={submit} disabled={!isReady}>
        업로드
      </SubmitButton>
    </Form>
  );
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50vw;
  gap: 16px;

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const MetaSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;

  > div:first-child {
    flex: 1;
  }

  > div:last-child {
    flex: 2; // 태그 선택이 앨범 선택보다 두 배 넓게
  }
`;

const ProgressBar = styled.div<{ $progress: number }>`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.divider};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
`;
