import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  onClick: () => void;
  label?: string;
  color?: string;
  testID?: string; // for testing purpose only
}

export function EditButton({
  onClick,
  label = "변경하기",
  color,
  testID = "edit-button",
}: Readonly<Props>) {
  const { colors } = useColors();

  const displayColor = color || colors.primaryDark;

  return (
    <Button onClick={onClick} data-testid={testID} type="button">
      <AppIcon icon="pencil" size={16} color={displayColor} />
      {label && <span style={{ color: displayColor }}>{label}</span>}
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
