import styled from "styled-components";

interface Props {
  height?: string;
  color?: string;
  bold?: boolean;
}

export function VerticalDivider({ height, color, bold }: Readonly<Props>) {
  return <Divider color={color} $bold={bold} height={height} />;
}

const Divider = styled.div<{ color?: string; $bold?: boolean; height?: string }>`
  width: ${({ $bold }) => ($bold ? "2px" : "1px")};
  height: ${({ height }) => height || "100%"};
  background-color: ${({ color, theme }) => color || theme.colors.borderLight};
`;
