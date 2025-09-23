import type { JSX } from "react";
import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

type Props = JSX.IntrinsicElements["select"] & {
  className?: string;
};

export function SimpleSelect({ className, ...props }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <SelectWrap className={className}>
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
