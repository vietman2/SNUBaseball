import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { ElevatedTextButton } from "@shared/ui/Buttons";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

export function ToggleSidebarButton({ isOpen, toggle }: Readonly<Props>) {
  const { colors, isDarkMode } = useColors();

  return (
    <Button
      onClick={toggle}
      aria-label="Toggle Sidebar"
      className={isOpen ? "" : "collapsed"}
      data-testid="toggle-sidebar-button"
    >
      <AppIcon
        icon={isOpen ? "sidebar-close" : "sidebar-open"}
        size={20}
        color={isDarkMode ? colors.gray700 : colors.primary}
      />
    </Button>
  );
}

const Button = styled(ElevatedTextButton)`
  background-color: ${({ theme }) => theme.colors.gray400};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
  }

  &.collapsed {
    padding: 8px;
  }
`;
