"use client";

import "client-only";
import styled from "styled-components";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorPage({ error, reset }: Readonly<Props>) {
  return (
    <ErrorPageWrapper>
      <h1>Error</h1>
      <div className="column">
        <p>{error.message}</p>
        <button onClick={reset}>다시 시도</button>
      </div>
    </ErrorPageWrapper>
  );
}

const ErrorPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  gap: 16px;

  h1 {
    font-size: 2.5rem;
  }

  p {
    margin: 0;
    font-size: 1.125rem;
    color: #e53935;
  }

  button {
    padding: 8px 16px;
    color: ${({ theme }) => theme.colors.onPrimary};
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    cursor: pointer;
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    gap: 16px;

    border-left: 1px solid ${({ theme }) => theme.colors.divider};
  }
`;
