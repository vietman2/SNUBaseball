import { useEffect, useRef, useState, type ReactNode } from "react";
import styled from "styled-components";

import { ModalOverlay, ModalDialog } from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  minWidth?: number;
}

/**
 * 간단하게 사용할 수 있는 모달 컴포넌트.
 * useSimpleModal 훅과 함께 사용.
 */

export function SimpleModal({
  isOpen,
  onClose,
  children,
  minWidth = 400,
}: Readonly<Props>) {
  const ANIMATION_MS = 200;
  const [mounted, setMounted] = useState(isOpen);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 열릴 때: 마운트 + exiting 해제
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setMounted(true);
      setExiting(false);
    } else if (mounted) {
      // 닫힐 때: exit 애니메이션 후 언마운트
      setExiting(true);
      timerRef.current = window.setTimeout(() => {
        setMounted(false);
        setExiting(false);
        timerRef.current = null;
      }, ANIMATION_MS);
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, onClose]);

  if (!mounted) return null;

  return (
    <ModalWrapper
      $exiting={exiting}
      $animationLength={200}
      onMouseDown={onClose}
      data-testid="modal-overlay"
    >
      <ModalContentWrapper
        $exiting={exiting}
        $animationLength={200}
        onMouseDown={(e) => e.stopPropagation()}
        style={{ minWidth }}
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
