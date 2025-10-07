import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { ModalDialog, ModalOverlay } from "./styles";

interface Props {
  children: ReactNode;
  onCloseTarget: string;
}

/**
 * 간단하게 model 페이지를 만들 수 있는 컴포넌트.
 * @param param0 children 모달 내부에 들어갈 내용
 * @param param1 onCloseTarget 모달 close 시, 뒤로갈 수 없을 때 이동할 경로
 * @returns
 */
export function SimpleModalPage({ children, onCloseTarget }: Readonly<Props>) {
  const [exiting, setExiting] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeMedia = useCallback(() => {
    navigate(onCloseTarget);
  }, [navigate, onCloseTarget]);

  const startCloseAnimation = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setExiting(false);
      closeMedia();
    }, 200);
  }, [closeMedia]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") startCloseAnimation();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [startCloseAnimation]);

  return (
    <Container
      $exiting={exiting}
      $animationLength={200}
      onClick={startCloseAnimation}
      data-testid="modal-overlay"
    >
      <ModalDialog
        $exiting={exiting}
        $animationLength={200}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </ModalDialog>
    </Container>
  );
}

const Container = styled(ModalOverlay)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;
