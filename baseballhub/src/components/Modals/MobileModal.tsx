import styled from "styled-components";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileModal({ isOpen, onClose, children }: Readonly<Props>) {
  return (
    <>
      {isOpen && <Backdrop onClick={onClose} />}
      <ModalContainer $isOpen={isOpen}>
        <Content>{children}</Content>
      </ModalContainer>
    </>
  );
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 88px;
  right: 0;
  height: calc(100dvh - 128px);
  width: calc(100vw - 48px);

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background900};
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 200;

  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(-16px)" : "translateX(100%)"};
  transition: transform 0.3s ease-in-out;
`;

const Content = styled.div`
  display: flex;
  flex: 1;

  height: 100%;
  overflow-y: auto;
`;
