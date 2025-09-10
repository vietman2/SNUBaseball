import { useMemo, useState } from "react";

import { Form, Wrapper } from "./styles";
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
        <span className="profile-form-label">이름</span>
        <span className="profile-form-value padding-left">
          {member.name}
        </span>
      </Wrapper>
      <Wrapper>
        <span className="profile-form-label">등번호</span>
        <div className="profile-form-value">
          <input
            value={backNumber ?? ""}
            onChange={(e) => setBackNumber(Number(e.target.value))}
            type="number"
            data-testid="back-number-input"
          />
        </div>
      </Wrapper>
      <Wrapper>
        <span className="profile-form-label">생년월일</span>
        <div className="profile-form-value">
          <DateInput
            value={birthDate}
            onChange={setBirthDate}
            data-testid="birth-date-input"
          />
        </div>
      </Wrapper>
      <Wrapper>
        <span className="profile-form-label">야구부 입부일</span>
        <div className="profile-form-value">
          <DateInput value={dateJoined} onChange={setDateJoined} />
        </div>
      </Wrapper>
      <Wrapper>
        <span className="profile-form-label">활동기간</span>
        <span className="profile-form-value padding-left">
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
