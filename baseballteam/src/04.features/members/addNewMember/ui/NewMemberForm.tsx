import styled from "styled-components";

import { ContactsSegment } from "./forms/ContactsSegment";
import { DatesSegment } from "./forms/DatesSegment";
import { MajorSegment } from "./forms/MajorSegment";
import { NameIdSegment } from "./forms/NameIdSegment";
import { useMemberForm } from "../hooks/useMemberForm";
import { ErrorText } from "@shared/ui/Texts";

interface Props {
  closeForm: () => void;
}

export function NewMemberForm({ closeForm }: Readonly<Props>) {
  const { isFormReady, errorMsg, submit } = useMemberForm({
    postSuccess: closeForm,
  });

  return (
    <Form onSubmit={submit} data-testid="new-member-form">
      <Subtitle>새 부원 추가</Subtitle>
      <NameIdSegment />
      <MajorSegment />
      <ContactsSegment />
      <DatesSegment />
      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
      <SubmitButton type="submit" disabled={!isFormReady}>
        추가
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Subtitle = styled.h4`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray500};
    cursor: not-allowed;
  }
`;
