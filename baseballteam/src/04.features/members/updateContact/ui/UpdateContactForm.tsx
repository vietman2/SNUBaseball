import styled from "styled-components";

import { PhoneInput } from "@shared/ui/Inputs";
import { Spinner } from "@shared/ui/Loading";
import { ErrorText } from "@shared/ui/Texts";
import { useContactForm } from "../hooks/useContactForm";
import { useContactInputs } from "@entities/members";

interface Props {
  memberId: number;
  closeModal: () => void;
}

export function UpdateContactForm({ memberId, closeModal }: Readonly<Props>) {
  const { submit, errorMsg, buttonDisabled, submitting } = useContactForm({
    memberId,
    postUpdate: closeModal,
  });
  const { phone, setPhone, email, setEmail, address, setAddress } =
    useContactInputs();

  return (
    <Container onSubmit={submit} data-testid="update-contacts-form">
      <h2>연락처 변경</h2>
      <InputsWrapper>
        <div>
          <label htmlFor="phone">휴대폰 번호</label>
          <PhoneInput
            id="phone"
            placeholder="휴대폰 (- 없이 숫자만 입력)"
            value={phone}
            onChange={setPhone}
          />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">주소</label>
          <input
            id="address"
            type="text"
            placeholder="주소"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </InputsWrapper>
      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
      <Button
        type="submit"
        disabled={buttonDisabled}
        data-testid="submit-contacts-update-button"
      >
        {submitting ? <Spinner /> : "변경하기"}
      </Button>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  width: 400px;
  max-width: 90vw;

  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  border-radius: 16px;

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  label {
    flex: 1;
  }

  input {
    flex: 4;
    padding: 8px 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.backgroundDefault};
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
