"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 90vh;
  padding-bottom: 64px;

  background-color: ${({ theme }) => theme.colors.background};
`;
