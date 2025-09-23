"use client";

import styled from "styled-components";

export const MilestoneContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 24px;
  gap: 16px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -9px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.background};
  }
`;

export const Year = styled.h1`
  margin: -5px 0 0 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Event = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 8px;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};

  p {
    margin: 4px 0 0 0;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const MilestoneImage = styled.div`
  margin-top: 8px;
  border-radius: 8px;
  overflow: hidden;

  img {
    display: block;
    border-radius: 8px;
    width: 100%;
    height: auto;
  }
`;
