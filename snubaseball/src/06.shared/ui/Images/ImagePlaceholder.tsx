"use client";

import styled from "styled-components";

export function ImagePlaceholder() {
  return <Placeholder>이미지 준비 중...</Placeholder>;
}

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56.25vh; // 16:9 aspect ratio, 100vw width
  max-height: 560px;
  width: 100%;
  max-width: 1000px;
  background-color: ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
`;
