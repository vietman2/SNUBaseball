import styled from "styled-components";

export const ProgressBar = styled.div<{ $progress: number }>`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.divider};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
`;
