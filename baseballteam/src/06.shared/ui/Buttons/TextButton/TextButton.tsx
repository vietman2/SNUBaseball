import styled from "styled-components";

import { useColors } from "@shared/lib/colors";

interface Props {
  text: string;
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
}

export function TextButton({
  text,
  onClick,
  backgroundColor,
  color,
}: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor ?? colors.primary,
        color: color ?? colors.background100,
      }}
      data-testid={`text-button-${text}`}
    >
      {text}
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
  padding: 8px 0;

  font-size: 1rem;
  font-weight: 600;

  border-radius: 8px;
  cursor: pointer;
`;
