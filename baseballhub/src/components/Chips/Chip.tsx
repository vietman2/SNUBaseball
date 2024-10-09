import styled from "styled-components";

import { AppIcon } from "@components/Icons";

interface Props {
  label: string;
  color?: string;
  bgColor?: string;
  onClick?: () => void;
  size?: "small" | "medium"; // | "large";
  icon?: string;
}

export function Chip({
  label,
  color = "white",
  bgColor = "#0f0f70",
  onClick,
  size = "medium",
  icon,
}: Readonly<Props>) {
  const getPadding = () => {
    if (size === "small") {
      return "2px 6px";
    } else {
      return "5px 10px";
    } /*else {
      return "5px 12px";
    }*/
  };

  return (
    <ChipWrapper
      style={{ color: color, backgroundColor: bgColor }}
      onClick={onClick}
      $hasOnClick={!!onClick}
      padding={getPadding()}
      data-testid="chip"
    >
      {icon && <AppIcon icon={icon} size={18} color={color} />}
      {label}
    </ChipWrapper>
  );
}

const ChipWrapper = styled.div<{ $hasOnClick: boolean; padding: string; }>`
  display: flex;
  position: relative;
  align-items: center;
  padding: ${({ padding }) => padding};
  gap: 4px;

  font-size: 14px;
  font-weight: 500;

  border-radius: 5px;
  cursor: ${({ $hasOnClick }) => ($hasOnClick ? "pointer" : "default")};

  white-space: nowrap;
`;
