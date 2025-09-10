"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 32px 0;
  gap: 24px;

  h1 {
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

export const MembersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .member-page-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 180px);
    gap: 24px;
  }
`;
