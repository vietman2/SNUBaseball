import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { useViews } from "@shared/lib/views";
import { AppIcon } from "@shared/ui/Icons";

export function ViewToggle() {
  const { activeView, switchToGrid, switchToList } = useViews();
  const { colors } = useColors();

  return (
    <Container>
      <ToggleButton $active={activeView === "GRID"} onClick={switchToGrid}>
        <AppIcon
          icon="grid"
          size={20}
          color={
            activeView === "GRID" ? colors.textPrimary : colors.textSecondary
          }
        />
      </ToggleButton>
      <ToggleButton $active={activeView === "LIST"} onClick={switchToList}>
        <AppIcon
          icon="list"
          size={20}
          color={
            activeView === "LIST" ? colors.textPrimary : colors.textSecondary
          }
        />
      </ToggleButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 8px;

  > button:first-child {
    border-radius: 8px 0 0 8px;
  }

  > button:last-child {
    border-radius: 0 8px 8px 0;
  }
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.gray200 : "transparent"};

  transition: background-color 0.2s;
`;
