import { useState } from "react";
import styled from "styled-components";

import { Section } from "./styles";
import { ModalDialog, ModalOverlay } from "@widgets/modal";
import { UpdateMajorModal } from "@features/profile/updateAccount";
import type { MajorType } from "@entities/majors";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  memberId: number;
  major: MajorType;
}

export function AcademicsSection({ major, memberId }: Readonly<Props>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
          <h4>전공</h4>
        </div>
        <div className="section-middle">
          <span className="section-text-secondary">{major.name}</span>
        </div>
        <div className="section-right">
          <Button onClick={openModal} data-testid="open-major-modal-button">
            <AppIcon icon="pencil" size={16} />
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
            <UpdateMajorModal
              memberId={memberId}
              originalMajor={major}
              closeModal={closeModal}
            />
          </ModalDialog>
        </ModalOverlay>
      )}
    </>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;

  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 500;
  font-size: 0.875rem;
`;
