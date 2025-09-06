import type { JSX } from "react";
import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

export function SimpleSelect(props: JSX.IntrinsicElements["select"]) {
  const { colors } = useColors();

  return (
    <SelectWrap>
      <NativeSelect {...props} />
      <AppIcon
        icon="chevron-down"
        size={16}
        color={props.disabled ? colors.gray400 : colors.gray600}
      />
    </SelectWrap>
  );
}

const SelectWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray900};

  &:focus-within {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const NativeSelect = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  flex: 1;
  font-size: 0.875rem;
  border: none;

  &:focus {
    outline: none;
  }
`;
