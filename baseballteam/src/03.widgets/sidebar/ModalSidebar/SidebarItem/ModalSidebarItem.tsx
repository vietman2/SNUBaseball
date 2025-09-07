import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  icon: string;
  label: string;
  isActive?: boolean;
}

export function ModalSidebarItem({
  icon,
  label,
  isActive = false,
}: Readonly<Props>) {
    const { colors } = useColors();

  return (
    <Container className={isActive ? "active" : ""}>
      <AppIcon icon={icon} size={20} color={isActive ? colors.primary : colors.gray900} />
      <span>{label}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 12px;
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.gray900};
  font-weight: 500;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.gray400};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }

  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
`;
