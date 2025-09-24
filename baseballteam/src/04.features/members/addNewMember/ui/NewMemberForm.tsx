import styled from "styled-components";

import { ContactsSegment } from "./forms/ContactsSegment";
import { DatesSegment } from "./forms/DatesSegment";
import { MajorSegment } from "./forms/MajorSegment";
import { NameIdSegment } from "./forms/NameIdSegment";
import { useMemberForm } from "../hooks/useMemberForm";
import { SubmitButton } from "@shared/ui/Buttons";
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
