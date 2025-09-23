"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 16px;

  h2 {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.gray900};
  }

  button, a {
    padding: 8px 16px;
    color: ${({ theme }) => theme.colors.onPrimary};
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
  }
`;
