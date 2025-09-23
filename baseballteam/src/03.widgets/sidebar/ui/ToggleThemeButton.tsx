import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  isSidebarOpen: boolean;
}

export function ToggleThemeButton({ isSidebarOpen }: Readonly<Props>) {
  const { colors, isDarkMode, toggleTheme } = useColors();

  const setDarkMode = () => {
    if (!isDarkMode) {
      toggleTheme();
    }
  };

  const setLightMode = () => {
    if (isDarkMode) {
      toggleTheme();
    }
  };

  if (isSidebarOpen) {
    return (
      <Container>
        <Button
          onClick={setLightMode}
          aria-label="Toggle theme"
          className={isDarkMode ? "" : "active"}
          data-testid="light-mode-button"
        >
          <AppIcon
            icon="sun"
            size={20}
            color={isDarkMode ? colors.gray700 : colors.primary}
          />
        </Button>
        <Button
          onClick={setDarkMode}
          aria-label="Toggle theme"
          className={isDarkMode ? "active" : ""}
          data-testid="dark-mode-button"
        >
          <AppIcon
            icon="moon"
            size={20}
            color={isDarkMode ? colors.primary : colors.gray700}
          />
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        data-testid="toggle-theme-button"
      >
        <AppIcon
          icon={isDarkMode ? "moon" : "sun"}
          size={20}
          color={isDarkMode ? colors.gray700 : colors.primary}
        />
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
  gap: 8px;

  background-color: ${({ theme }) => theme.colors.gray400};
  border-radius: 8px;

  transition: background-color 0.3s;
`;

const Button = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 4px;

  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
  }
`;
