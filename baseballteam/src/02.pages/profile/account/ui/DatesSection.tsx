import styled from "styled-components";

import { Section, SectionSubtitle } from "./styles";
import { SimpleModal, useSimpleModal } from "@widgets/modal";
import { UpdateDatesForm } from "@features/members/updateDates";
import { DateInputsProvider, MemberInfoItem } from "@entities/members";
import { EditButton } from "@shared/ui/Buttons";

interface Props {
  memberId: number;
  birthDate: string | null; // YYYY-MM-DD
  joinDate: string | null; // YYYY-MM-DD
}

export function DatesSection({
  memberId,
  birthDate,
  joinDate,
}: Readonly<Props>) {
  const { isOpen, open, close } = useSimpleModal();

  return (
    <>
      <Section>
        <SectionSubtitle>기타</SectionSubtitle>
        <VerticalSection>
          <MemberInfoItem label="생년월일" value={birthDate ?? "-"} />
          <MemberInfoItem label="야구부 입부일" value={joinDate ?? "-"} />
        </VerticalSection>
        <EditButtonWrapper>
          <EditButton onClick={open} />
        </EditButtonWrapper>
      </Section>
      <SimpleModal isOpen={isOpen} onClose={close}>
        <DateInputsProvider
          originalBirthDate={birthDate}
          originalJoinDate={joinDate}
        >
          <UpdateDatesForm memberId={memberId} closeModal={close} />
        </DateInputsProvider>
      </SimpleModal>
    </>
  );
}

const VerticalSection = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const EditButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
