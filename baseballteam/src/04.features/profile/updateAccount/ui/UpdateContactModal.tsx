import { useMemo, useState } from "react";
import styled from "styled-components";

import { useUpdateAccountMutation } from "../api/updateAccount";
import { PhoneInput } from "@shared/ui/Inputs";
import { Spinner } from "@shared/ui/Loading";

interface Props {
  memberId: number;
  originalPhone: string | null;
  originalEmail: string | null;
  originalAddress: string | null;
  closeModal: () => void;
}

export function UpdateContactModal({
  memberId,
  originalPhone,
  originalEmail,
  originalAddress,
  closeModal,
}: Readonly<Props>) {
  const [newPhone, setNewPhone] = useState<string>(originalPhone ?? "");
  const [newEmail, setNewEmail] = useState<string>(originalEmail ?? "");
  const [newAddress, setNewAddress] = useState<string>(originalAddress ?? "");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: updateContacts } = useUpdateAccountMutation(memberId);

  const buttonDisabled = useMemo(() => {
    return (
      submitting ||
      (newPhone === (originalPhone ?? "") &&
        newEmail === (originalEmail ?? "") &&
        newAddress === (originalAddress ?? ""))
    );
  }, [
    submitting,
    newPhone,
    newEmail,
    newAddress,
    originalPhone,
    originalEmail,
    originalAddress,
  ]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (buttonDisabled) return;

    setSubmitting(true);
    setError(null);

    updateContacts(
      {
        phone: newPhone,
        email: newEmail,
        address: newAddress,
      },
      {
        onSuccess: (result) => {
          if (result.status !== "SUCCESS") {
            setError(result.message);
            setSubmitting(false);
          } else {
            closeModal();
          }
        },
      }
    );
  };

  return (
    <Container onSubmit={submit} data-testid="update-contacts-form">
      <h2>연락처 변경</h2>
      <InputsWrapper>
        <div>
          <label htmlFor="phone">휴대폰 번호</label>
          <PhoneInput
            id="phone"
            placeholder="휴대폰"
            value={newPhone}
            onChange={setNewPhone}
          />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="이메일"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">주소</label>
          <input
            id="address"
            type="text"
            placeholder="주소"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </div>
      </InputsWrapper>
      {error && <p className="update-modal-error-text">{error}</p>}
      <Button type="submit" disabled={buttonDisabled} data-testid="submit-contacts-update-button">
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

  .update-modal-error-text {
    margin: 0;
    font-size: 0.875rem;
    text-align: right;
    color: ${({ theme }) => theme.colors.error};
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
