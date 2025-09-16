import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { ModalDialog, ModalOverlay } from "@widgets/modal";

const FADE_MS = 180; // 애니메이션 총 시간 (ms)

export function ModalLayout() {
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  // 모달 띄울 때 저장한 백그라운드 location
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | undefined;
  const backgroundLocation = state?.backgroundLocation;

  const closeTarget = backgroundLocation
    ? `${backgroundLocation.pathname}${backgroundLocation.search}${backgroundLocation.hash}`
    : "/home";

  const closeModal = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);

    timerRef.current = window.setTimeout(() => {
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

  // 새로 열릴 때는 스크롤 락 + 타이머 정리
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      if (timerRef.current) clearTimeout(timerRef.current); // ✅ 타이머 정리
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
