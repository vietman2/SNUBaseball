import styled from "styled-components";

import { Section, SectionSubtitle } from "./styles";
import { SimpleModal, useSimpleModal } from "@widgets/modal";
import { UpdateContactForm } from "@features/members/updateContact";
import { ContactInputsProvider, MemberInfoItem } from "@entities/members";
import { formatPhoneKR } from "@shared/lib/formatters";
import { EditButton } from "@shared/ui/Buttons";

interface Props {
  memberId: number;
  phone: string | null;
  email: string | null;
  address: string | null;
}

export function ContactsSection({
  memberId,
  phone,
  email,
  address,
}: Readonly<Props>) {
  const { isOpen, open, close } = useSimpleModal();

  return (
    <>
      <Section>
        <SectionSubtitle>연락처</SectionSubtitle>
        <VerticalSection>
          <MemberInfoItem
            label="휴대폰"
            value={phone ? formatPhoneKR(phone) : "등록된 휴대폰이 없습니다."}
          />
          <MemberInfoItem
            label="이메일"
            value={email || "등록된 이메일이 없습니다."}
          />
          <MemberInfoItem
            label="주소"
            value={address || "등록된 주소가 없습니다."}
          />
        </VerticalSection>
        <EditButtonWrapper>
          <EditButton onClick={open} />
        </EditButtonWrapper>
      </Section>
      {isOpen && (
        <SimpleModal isOpen={isOpen} onClose={close}>
          <ContactInputsProvider
            originalPhone={phone}
            originalEmail={email}
            originalAddress={address}
          >
            <UpdateContactForm memberId={memberId} closeModal={close} />
          </ContactInputsProvider>
        </SimpleModal>
      )}
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
