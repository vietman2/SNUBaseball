import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import styled, { keyframes, css } from "styled-components";

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
    <Overlay
      $exiting={isExiting}
      onMouseDown={closeModal}
      data-testid="modal-overlay"
    >
      <Dialog
        $exiting={isExiting}
        onMouseDown={(e) => e.stopPropagation()}
        aria-modal="true"
        data-testid="modal-dialog"
      >
        <Outlet />
      </Dialog>
    </Overlay>
  );
}

const fadeIn = keyframes`
  from { opacity: 0 }
  to   { opacity: 1 }
`;
const fadeOut = keyframes`
  from { opacity: 1 }
  to   { opacity: 0 }
`;

const popIn = keyframes`
  from { transform: translateY(8px) scale(.98); opacity: 0 }
  to   { transform: translateY(0)    scale(1);   opacity: 1 }
`;
const popOut = keyframes`
  from { transform: translateY(0)    scale(1);   opacity: 1 }
  to   { transform: translateY(8px)  scale(.98); opacity: 0 }
`;

interface Props {
  $exiting: boolean;
}

const Overlay = styled.div<Props>`
  display: grid;
  place-items: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);

  ${({ $exiting }) => css`
    animation: ${$exiting ? fadeOut : fadeIn} ${FADE_MS}ms ease-out forwards;
  `}

  z-index: 1000;
`;

const Dialog = styled.div<Props>`
  ${({ $exiting }) => css`
    animation: ${$exiting ? popOut : popIn} ${FADE_MS}ms
      cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  `}
`;
