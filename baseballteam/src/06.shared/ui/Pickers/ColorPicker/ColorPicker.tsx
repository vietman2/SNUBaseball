import { HexColorPicker } from "react-colorful";
import styled from "styled-components";

import { usePickerMenu } from "../usePickerMenu";

interface Props {
  color: string;
  onChange: (color: string) => void;
  size?: number;
}

export function ColorPicker({ color, onChange, size = 24 }: Readonly<Props>) {
  const { rootRef, menuOpen, openMenu, closeMenu } = usePickerMenu();

  return (
    <Wrapper ref={rootRef}>
      <DisplayBox
        type="button"
        style={{ width: size, height: size, backgroundColor: color }}
        onClick={menuOpen ? closeMenu : openMenu}
        data-testid="color-picker-display"
      />
      {menuOpen && (
        <PickerBox onPointerDownCapture={(e) => e.stopPropagation()}>
          <HexColorPicker color={color} onChange={onChange} />
        </PickerBox>
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
  position: relative;
  border-radius: 4px;
  border: 0;
  padding: 0;
  cursor: pointer;
`;

const PickerBox = styled.div`
  position: absolute;
  bottom: 36px;
  right: 0;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;
