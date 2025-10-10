import styled from "styled-components";

import { ModalPageContainer } from "@widgets/modal";
import {
  SelectMediaMeta,
  useUploadMediaForm,
} from "@features/gallery/media/upload";
import { FileDropArea, SelectedFiles, useFileSelect } from "@shared/lib/files";
import { SubmitButton } from "@shared/ui/Buttons";
import { ProgressBar } from "@shared/ui/ProgressBars";

export function UploadForm() {
  const { submit, isReady } = useUploadMediaForm();
  const { overallProgress } = useFileSelect();

  return (
    <Container>
      <h2>파일 업로드</h2>
      <SelectMediaMeta />
      <FileDropArea />
      <SelectedFiles />
      {overallProgress > 0 && (
        <ProgressBar $progress={overallProgress} data-testid="progress-bar" />
      )}
      <SubmitButton onClick={submit} disabled={!isReady}>
        업로드
      </SubmitButton>
    </Container>
  );
}

const Container = styled(ModalPageContainer)`
  flex-direction: column;
  min-height: 40vh;
  width: 60vw;
  padding: 24px;
  gap: 16px;

  background-color: ${({ theme }) => theme.colors.backgroundDefault};

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
