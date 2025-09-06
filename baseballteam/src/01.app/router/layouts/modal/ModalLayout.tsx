import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import { ModalDialog, ModalOverlay } from "@widgets/modal";

const FADE_MS = 180; // 애니메이션 총 시간 (ms)

export function ModalLayout() {
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const closeModal = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);

    // fadeOut 끝난 후 뒤로가기
    timerRef.current = window.setTimeout(() => {
      if (window.history.length <= 2) {
        navigate("/home", { replace: true });
      } else {
        navigate(-1);
      }
    }, FADE_MS);
  }, [navigate, isExiting]);

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
