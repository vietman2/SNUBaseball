import styled from "styled-components";

import { useCreateAlbumForm } from "../hooks/useCreateAlbumForm";
import { AlbumFormInputs } from "@entities/gallery";
import { SubmitButton } from "@shared/ui/Buttons";
import { ErrorText } from "@shared/ui/Texts";

interface Props {
  closeModal: () => void;
}

export function NewAlbumForm({ closeModal }: Readonly<Props>) {
  const { isButtonDisabled, submit, errorMsg } = useCreateAlbumForm({
    postSuccess: closeModal,
  });

  return (
    <Container onSubmit={submit} data-testid="new-album-form">
      <Title>새 앨범 추가</Title>
      <AlbumFormInputs />
      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
      <SubmitButton
        type="submit"
        data-testid="submit-album"
        disabled={isButtonDisabled}
      >
        추가
      </SubmitButton>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;
