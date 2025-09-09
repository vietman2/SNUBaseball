import { useMemo, useState } from "react";
import styled from "styled-components";

import { useUpdateProfileMutation } from "../api/updateProfile";
import type { MemberDetailType } from "@entities/members";
import { DateInput } from "@shared/ui/Inputs";
import { Spinner } from "@shared/ui/Loading";
import { SimpleTooltip } from "@shared/ui/Tooltips";

interface Props {
  member: MemberDetailType;
}

export function BasicProfileForm({ member }: Readonly<Props>) {
  const [backNumber, setBackNumber] = useState<number | null>(
    member.back_number
  );
  const [birthDate, setBirthDate] = useState<string | null>(
    member.birth_date ?? null
  );
  const [dateJoined, setDateJoined] = useState<string | null>(
    member.date_joined ?? null
  );

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: updateProfile } = useUpdateProfileMutation(member.id);

  const buttonEnabled = useMemo(() => {
    return (
      submitting ||
      backNumber !== member.back_number ||
      birthDate !== member.birth_date ||
      dateJoined !== member.date_joined
    );
  }, [backNumber, birthDate, dateJoined, member, submitting]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!buttonEnabled) return;

    setSubmitting(true);
    setError(null);

    updateProfile(
      {
        back_number: backNumber,
        birth_date: birthDate,
        date_joined: dateJoined,
        num_semester: member.num_semester,
      },
      {
        onSuccess: (response) => {
          if (response.status === "SUCCESS") {
            setError(null);
          } else {
            setError(response.message);
          }
          setSubmitting(false);
        },
      }
    );
  };

  return (
    <Form onSubmit={submit} data-testid="basic-profile-form">
      <Wrapper>
        <span className="basic-profile-form-label">이름</span>
        <span className="basic-profile-form-value padding-left">
          {member.name}
        </span>
      </Wrapper>
      <Wrapper>
        <span className="basic-profile-form-label">등번호</span>
        <div className="basic-profile-form-value">
          <input
            value={backNumber ?? ""}
            onChange={(e) => setBackNumber(Number(e.target.value))}
            type="number"
            data-testid="back-number-input"
          />
        </div>
      </Wrapper>
      <Wrapper>
        <span className="basic-profile-form-label">생년월일</span>
        <div className="basic-profile-form-value">
          <DateInput
            value={birthDate}
            onChange={setBirthDate}
            data-testid="birth-date-input"
          />
        </div>
      </Wrapper>
      <Wrapper>
        <span className="basic-profile-form-label">야구부 입부일</span>
        <div className="basic-profile-form-value">
          <DateInput value={dateJoined} onChange={setDateJoined} />
        </div>
      </Wrapper>
      <Wrapper>
        <span className="basic-profile-form-label">활동기간</span>
        <span className="basic-profile-form-value padding-left">
          {member.num_semester ? `${member.num_semester}학기` : "-"}
          <SimpleTooltip text="활동 기간 수정은 주장단에 문의해주세요." />
        </span>
      </Wrapper>
      {error && <p className="update-error-text">{error}</p>}
      {buttonEnabled && (
        <button type="submit" data-testid="basic-profile-submit-button">
          {submitting ? <Spinner /> : "저장"}
        </button>
      )}
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    padding: 8px 0;

    color: ${({ theme }) => theme.colors.onPrimary};
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
  }

  .update-error-text {
    margin: 0;
    padding: 0 16px;
    font-size: 0.875rem;
    text-align: right;
    color: ${({ theme }) => theme.colors.error};
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 24px;
  gap: 16px;

  .basic-profile-form-label {
    flex: 1;
    text-align: right;
    font-weight: 500;
  }

  .basic-profile-form-value {
    display: flex;
    flex: 4;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font-weight: 500;

    > input {
      padding: 8px 12px;
      min-width: 140px;
      max-width: 140px;
      border: none;
      background-color: ${({ theme }) => theme.colors.gray100};
      border-radius: 8px;
      font-size: 0.875rem;
      font-family: inherit;
      color: ${({ theme }) => theme.colors.gray900};
    }
  }

  .padding-left {
    padding-left: 8px;
  }
`;
