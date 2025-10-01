import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  onClick: () => void;
  label?: string;
  color?: string;
}

export function DeleteButton({
  onClick,
  label = "삭제하기",
  color,
}: Readonly<Props>) {
  const { colors } = useColors();

  const displayColor = color || colors.error;

  return (
    <Button onClick={onClick}>
      <AppIcon icon="trash" size={16} color={displayColor} />
      <span style={{ color: displayColor }}>{label}</span>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;

  font-weight: 500;
  font-size: 0.875rem;
`;
