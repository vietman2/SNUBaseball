import styled from "styled-components";

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 0 32px;
  color: ${({ theme }) => theme.colors.primary};
`;

interface Props {
  children: React.ReactNode;
  size?: "small" | "large";
}

export function Subtitle({ size = "small", children }: Readonly<Props>) {
  return <Sub size={size}>{children}</Sub>;
}

const Sub = styled.div<{ size: "small" | "large" }>`
  padding: 0 16px;
  font-size: ${({ size }) => (size === "small" ? "16px" : "24px")};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};
`;
