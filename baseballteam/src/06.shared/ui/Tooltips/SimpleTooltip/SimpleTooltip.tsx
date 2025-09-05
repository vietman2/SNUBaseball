import styled from "styled-components";

import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  text: string;
}

export function SimpleTooltip({ text }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <Wrapper>
      <AppIcon icon="info-circle" size={20} color={colors.gray700} />
      <Tooltip>{text}</Tooltip>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover > div {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-12px); /* 살짝 위로 */
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  margin-bottom: 6px;

  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.gray900};
  color: white;
  font-size: 0.875rem;
  border-radius: 4px;
  white-space: nowrap;

  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
  z-index: 100;
`;
