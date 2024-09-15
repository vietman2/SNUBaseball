import styled from "styled-components";

interface Props {
  label: string;
  color?: string;
  bgColor?: string;
  onClick?: () => void;
}

export function Chip({
  label,
  color = "white",
  bgColor = "#0f0f70",
  onClick,
}: Readonly<Props>) {
  return (
    <ChipWrapper
      style={{ color: color, backgroundColor: bgColor }}
      onClick={onClick}
      $hasOnClick={!!onClick}
      data-testid="chip"
    >
      {label}
    </ChipWrapper>
  );
}

const ChipWrapper = styled.div<{ $hasOnClick: boolean }>`
  display: inline-block;
  position: relative;
  align-items: center;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  cursor: ${({ $hasOnClick }) => ($hasOnClick ? "pointer" : "default")};
`;
