"use client";

import "client-only";
import styled, { keyframes } from "styled-components";

interface Props {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export function Skeleton({ width, height, borderRadius }: Readonly<Props>) {
  if (width === 0 || height === 0) {
    return null; // Avoid rendering if width or height is zero
  }

  // Default values for width, height, and borderRadius
  width = typeof width === "number" ? `${width}px` : width || "100%";
  height = typeof height === "number" ? `${height}px` : height || "1rem";
  borderRadius =
    typeof borderRadius === "number"
      ? `${borderRadius}px`
      : borderRadius || "8px";

  return (
    <SkeletonWrapper
      style={{ width, height, borderRadius }}
      data-testid="skeleton"
    />
  );
}

const shimmer = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

const SkeletonWrapper = styled.div<Props>`
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.25s ease-in-out infinite;
`;
