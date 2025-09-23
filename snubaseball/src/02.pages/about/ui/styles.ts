"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  gap: 8px;

  font-family: "Nanum Myeongjo", serif;

  .about-page-subtitle {
    margin: 16px 0 0 0;
    font-size: 1.75rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
  }

  > p {
    font-size: 1rem;
    line-height: 2rem;
  }
`;

export const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 32px;

  border-left: 2px solid ${({ theme }) => theme.colors.divider};
`;
