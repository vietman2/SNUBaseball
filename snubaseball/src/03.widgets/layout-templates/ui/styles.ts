"use client";

import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0px;
`;

export const ImageHeader = styled.div`
  position: relative;
  width: 100%;
  height: 160px;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  > img {
    object-fit: cover;
    width: 100%;
    height: auto;
    border-radius: 8px;
    vertical-align: middle;
  }

  .overlay-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 0px;
  gap: 32px;

  h1 {
    /* Loading 페이지에서 사용할 h1 스타일 */
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
