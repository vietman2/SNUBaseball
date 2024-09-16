import styled from "styled-components";

interface Props {
  label: string;
  color?: string;
  bgColor?: string;
  onClick?: () => void;
  small?: boolean;
}

export function Chip({
  label,
  color = "white",
  bgColor = "#0f0f70",
  onClick,
  small = false,
}: Readonly<Props>) {
  return (
    <ChipWrapper
      style={{ color: color, backgroundColor: bgColor }}
      onClick={onClick}
      $hasOnClick={!!onClick}
      $small={small}
      data-testid="chip"
    >
      {label}
    </ChipWrapper>
  );
}

const ChipWrapper = styled.div<{ $hasOnClick: boolean; $small: boolean }>`
  display: inline-block;
  position: relative;
  align-items: center;
  padding: ${({ $small }) => ($small ? "2px 6px" : "5px 10px")};
  font-size: 14px;
  border-radius: 5px;
  cursor: ${({ $hasOnClick }) => ($hasOnClick ? "pointer" : "default")};
`;
