import styled from "styled-components";

import { useMajorForm } from "../hooks/useMajorForm";
import {
  CollegeSelect,
  DepartmentSelect,
  useMajorSelects,
} from "@entities/majors";
import { useColors } from "@shared/lib/styles";
import { ElevatedTextButton } from "@shared/ui/Buttons";
import { Spinner } from "@shared/ui/Loading";
import { ErrorText } from "@shared/ui/Texts";

interface Props {
  memberId: number;
  closeModal: () => void;
}

export function UpdateMajorForm({ memberId, closeModal }: Readonly<Props>) {
  const { loading, error } = useMajorSelects();
  const { errorMsg, isButtonDisabled, submit } = useMajorForm({
    memberId,
    postUpdate: closeModal,
  });
  const { colors } = useColors();

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  if (error) {
    window.alert(
      "전공 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
    );
    closeModal();
    return null;
  }

  return (
    <Container onSubmit={submit} data-testid="update-major-form">
      <h2>전공 변경</h2>
      <InputsWrapper>
        <CollegeSelect />
        <DepartmentSelect />
      </InputsWrapper>
      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
      <Button
        type="submit"
        disabled={isButtonDisabled}
        $backgroundColor={colors.primary}
        $color={colors.onPrimary}
        data-testid="submit-major-form-button"
      >
        변경하기
      </Button>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LoadingContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;

  .major-select {
    padding: 8px 12px;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.gray900};

    &:focus-within {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
`;

const Button = styled(ElevatedTextButton)`
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray500};
    cursor: not-allowed;
  }
`;
