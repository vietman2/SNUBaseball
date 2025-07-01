import styled, { keyframes } from "styled-components";

interface Props {
  size?: number;
}

export function LoadingSpinner({ size = 60 }: Readonly<Props>) {
  return <Spinner $size={size} />;
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border: ${({ $size, theme }) =>
    `${$size / 6}px solid ${theme.colors.background100}`};
  border-top: ${({ $size, theme }) =>
    `${$size / 6}px solid ${theme.colors.primary}`};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;
