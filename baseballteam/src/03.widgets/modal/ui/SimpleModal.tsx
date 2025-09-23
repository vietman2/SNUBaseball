import type { ReactNode } from "react";
import styled from "styled-components";

import { ModalOverlay, ModalDialog } from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * 간단하게 사용할 수 있는 모달 컴포넌트.
 * useSimpleModal 훅과 함께 사용.
 */

export function SimpleModal({ isOpen, onClose, children }: Readonly<Props>) {
  if (!isOpen) return null;

  return (
    <ModalWrapper
      $exiting={false}
      $animationLength={200}
      onMouseDown={onClose}
      data-testid="modal-overlay"
    >
      <ModalContentWrapper
        $exiting={false}
        $animationLength={200}
        onMouseDown={(e) => e.stopPropagation()}
        data-testid="modal-dialog"
      >
        {children}
      </ModalContentWrapper>
    </ModalWrapper>
  );
}

const ModalWrapper = styled(ModalOverlay)`
  background-color: ${({ theme }) => theme.colors.overlay}50;
  border-radius: 12px;
`;

const ModalContentWrapper = styled(ModalDialog)`
  padding: 24px;
  min-width: 400px;
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
