import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  onClick: () => void;
  label?: string;
  color?: string;
  testID?: string;
}

export function DeleteButton({
  onClick,
  label = "삭제하기",
  color,
  testID = "delete-button",
}: Readonly<Props>) {
  const { colors } = useColors();

  const displayColor = color || colors.error;

  return (
    <Button onClick={onClick} data-testid={testID}>
      <AppIcon icon="trash" size={16} color={displayColor} />
      {label && <span style={{ color: displayColor }}>{label}</span>}
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  font-weight: 500;
  font-size: 0.875rem;
`;
