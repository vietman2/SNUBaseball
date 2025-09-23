"use client";

import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 0px;
  gap: 24px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;

  > div:first-child {
    display: flex;
    flex: 1;
    align-items: flex-start;
    justify-content: center;
  }
`;

export const AvatarWrapper = styled.div`
  max-height: 40vh;
  height: 400px;
  max-width: 30vw;
  width: 300px;
  position: relative;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: 12px;

  > h1 {
    margin: 0;
    margin-bottom: 8px;
    font-size: 1.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
