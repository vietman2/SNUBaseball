"use client";

import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  padding: 0 12.5%;
  min-height: calc(100vh - 64px);

  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 7.5%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 16px;
  }
`;
