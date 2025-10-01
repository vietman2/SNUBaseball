import styled from "styled-components";

import { AppIcon } from "@shared/ui/Icons";

interface Props {
  label: string;
  icon?: string;
  color?: string;
  size?: number;
}

export function SimpleBadge({ label, icon, color = "#000", size = 16 }: Readonly<Props>) {
  return (
    <Container style={{ backgroundColor: `${color}20`, color, fontSize: size * 0.85 }}>
      {icon && <AppIcon icon={icon} size={size} color={color} />}
      {label}
    </Container>
  );
}

const Container = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  max-height: 32px;
  padding: 4px 8px;
  gap: 8px;

  font-weight: 500;
  line-height: 1rem;
  white-space: nowrap;

  border-radius: 4px;
`;
