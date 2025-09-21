import styled from "styled-components";

import { useDatesForm } from "../form/useDatesForm";
import { useDateInputs } from "@entities/members";
import { DateInput } from "@shared/ui/Inputs";
import { Spinner } from "@shared/ui/Loading";
import { ErrorText } from "@shared/ui/Texts";

interface Props {
  memberId: number;
  closeModal: () => void;
}

export function UpdateDatesForm({ memberId, closeModal }: Readonly<Props>) {
  const { birthDate, setBirthDate, dateJoined, setDateJoined } =
    useDateInputs();
  const { submit, buttonDisabled, errorMsg, isPending } = useDatesForm({
    memberId,
    postUpdate: closeModal,
  });

  return (
    <Container onSubmit={submit} data-testid="update-dates-form">
      <h2>기타 정보 변경</h2>
      <InputWrapper>
        <label htmlFor="birth-date">생년월일</label>
        <div className="profile-form-value">
          <DateInput
            id="birth-date"
            value={birthDate}
            onChange={setBirthDate}
            data-testid="birth-date-input"
          />
        </div>
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="join-date">야구부 입부일</label>
        <div className="profile-form-value">
          <DateInput
            id="join-date"
            value={dateJoined}
            onChange={setDateJoined}
            data-testid="join-date-input"
          />
        </div>
      </InputWrapper>
      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
      <Button
        type="submit"
        disabled={buttonDisabled}
        data-testid="submit-contacts-update-button"
      >
        {isPending ? <Spinner /> : "변경하기"}
      </Button>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 24px;
  gap: 16px;

  > label {
    flex: 1;
    text-align: right;
    font-weight: 500;
  }

  .profile-form-value {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font-weight: 500;

    > input {
      padding: 8px 12px;
      border: none;
      background-color: ${({ theme }) => theme.colors.gray100};
      border-radius: 8px;
      font-size: 0.875rem;
      font-family: inherit;
      color: ${({ theme }) => theme.colors.gray900};
    }
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 600;
  font-size: 0.875rem;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
