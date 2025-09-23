import type { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  message?: string;
}

export function ErrorWidget({ children, message }: Readonly<Props>) {
  return (
    <Container>
      <h2>{message ?? "오류가 발생했습니다."}</h2>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 16px;

  button {
    padding: 8px 16px;
    color: ${({ theme }) => theme.colors.onPrimary};
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
  }
`;
