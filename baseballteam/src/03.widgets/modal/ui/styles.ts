import styled, { keyframes, css } from "styled-components";

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
  $animationLength: number;
}

export const ModalOverlay = styled.div<Props>`
  display: grid;
  place-items: center;
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.overlay}80;

  ${({ $exiting, $animationLength }) => css`
    animation: ${$exiting ? fadeOut : fadeIn} ${$animationLength}ms ease-out
      forwards;
  `}

  z-index: 50;
`;

export const ModalDialog = styled.div<Props>`
  ${({ $exiting, $animationLength }) => css`
    animation: ${$exiting ? popOut : popIn} ${$animationLength}ms
      cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  `}
`;

export const ModalPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 65vw;
  min-width: 760px;
  min-height: 75vh;
  max-height: 75vh;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
`;
