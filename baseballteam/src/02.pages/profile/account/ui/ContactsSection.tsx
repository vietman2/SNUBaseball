import { useState } from "react";
import styled from "styled-components";

import { Section } from "./styles";
import { ModalDialog, ModalOverlay } from "@widgets/modal";
import { UpdateContactModal } from "@features/account/updateAccount";
import { formatPhoneKR } from "@shared/lib/formatters";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { colors } = useColors();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Section>
        <div className="section-left">
          <h4>연락처</h4>
        </div>
        <MiddleSection className="section-middle">
          <div>
            <span className="section-text-secondary">휴대폰</span>
            <span className="section-text-tertiary">
              {phone ? formatPhoneKR(phone) : "등록된 휴대폰이 없습니다."}
            </span>
          </div>
          <div>
            <span className="section-text-secondary">이메일</span>
            <span className="section-text-tertiary">
              {email || "등록된 이메일이 없습니다."}
            </span>
          </div>
          <div>
            <span className="section-text-secondary">주소</span>
            <span className="section-text-tertiary">
              {address || "등록된 주소가 없습니다."}
            </span>
          </div>
        </MiddleSection>
        <div className="section-right">
          <Button onClick={openModal} data-testid="open-contacts-modal-button">
            <AppIcon icon="pencil" size={16} color={colors.primaryDark} />
            <span>변경하기</span>
          </Button>
        </div>
      </Section>
      {isModalOpen && (
        <ModalOverlay
          $exiting={!isModalOpen}
          $animationLength={200}
          onMouseDown={closeModal}
          data-testid="modal-overlay"
        >
          <ModalDialog
            $exiting={!isModalOpen}
            $animationLength={200}
            onMouseDown={(e) => e.stopPropagation()}
            data-testid="modal-dialog"
          >
            <UpdateContactModal
              memberId={memberId}
              closeModal={closeModal}
              originalPhone={phone}
              originalEmail={email}
              originalAddress={address}
            />
          </ModalDialog>
        </ModalOverlay>
      )}
    </>
  );
}

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 4px;

  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: 500;
  font-size: 0.875rem;
`;
