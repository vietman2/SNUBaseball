import styled from "styled-components";

import { usePickerMenu } from "../usePickerMenu";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  options: string[];
  icon: string;
  onChange: (icon: string) => void;
  color?: string;
  size?: number;
}

export function IconPicker({
  options,
  icon,
  onChange,
  color = "#000000",
  size = 24,
}: Readonly<Props>) {
  const { rootRef, menuOpen, openMenu, closeMenu } = usePickerMenu();

  const selectIcon = (icon: string) => {
    onChange(icon);
    closeMenu();
  };

  return (
    <Wrapper ref={rootRef}>
      <DisplayBox
        type="button"
        onClick={menuOpen ? closeMenu : openMenu}
        data-testid="icon-picker-display"
      >
        <AppIcon icon={icon} size={size} color={color} />
      </DisplayBox>
      {menuOpen && (
        <List onPointerDownCapture={(e) => e.stopPropagation()}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => selectIcon(option)}
              data-testid={`icon-option-${option}`}
            >
              <AppIcon icon={option} size={20} color={color} />
            </button>
          ))}
        </List>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-self: center;
`;

const DisplayBox = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  position: relative;
  border-radius: 4px;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 4px;
  width: max-content;

  position: absolute;
  top: 150%;
  left: 0;
  transform: translateX(-25%);
  z-index: 5;

  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  border-radius: 4px;

  overflow-y: auto;

  > button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 4px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray100};
    }
  }
`;
