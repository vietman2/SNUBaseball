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
      <ModalDialog
        $exiting={false}
        $animationLength={200}
        onMouseDown={(e) => e.stopPropagation()}
        data-testid="modal-dialog"
      >
        {children}
      </ModalDialog>
    </ModalWrapper>
  );
}

const ModalWrapper = styled(ModalOverlay)`
  background-color: ${({ theme }) => theme.colors.overlay}50;
  border-radius: 12px;
`;
