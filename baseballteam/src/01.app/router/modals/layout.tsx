import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import { ModalDialog, ModalOverlay } from "@widgets/modal";
import { useRouter } from "@shared/lib/router";

const FADE_MS = 180; // 애니메이션 총 시간 (ms)

export function ModalLayout() {
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const { backgroundLocation, isModal } = useRouter();

  // 모달이 아닐 일이 거의 없지만, 방어적으로 fallback
  const closeTarget = isModal
    ? `${backgroundLocation.pathname}${backgroundLocation.search}${backgroundLocation.hash}`
    : "/home";

  const closeModal = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    timerRef.current = window.setTimeout(() => {
      // background로 복귀. replace로 히스토리 정리
      navigate(closeTarget, { replace: true });
    }, FADE_MS);
  }, [isExiting, navigate, closeTarget]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeModal]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ModalOverlay
      $exiting={isExiting}
      $animationLength={FADE_MS}
      onMouseDown={closeModal}
      data-testid="modal-overlay"
    >
      <ModalDialog
        $exiting={isExiting}
        $animationLength={FADE_MS}
        onMouseDown={(e) => e.stopPropagation()}
        aria-modal="true"
        data-testid="modal-dialog"
      >
        <Outlet />
      </ModalDialog>
    </ModalOverlay>
  );
}
