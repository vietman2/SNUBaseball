import styled from "styled-components";

interface Props {
  height?: string;
  bold?: boolean;
  color?: string;
}

export function VerticalDivider({
  height = "100%",
  bold = false,
  color = "#D4D4D4",
}: Readonly<Props>) {
  return <Divider $bold={bold} height={height} color={color} />;
}

const Divider = styled.div<{
  color?: string;
  $bold?: boolean;
  height?: string;
}>`
  width: ${({ $bold }) => ($bold ? "2px" : "1px")};
  height: ${({ height }) => height};
  background-color: ${({ color }) => color};
`;
