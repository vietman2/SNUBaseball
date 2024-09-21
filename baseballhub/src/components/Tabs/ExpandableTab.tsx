import { useState } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { palette } from "@colors/palette";

interface Props {
  title: string;
  children: React.ReactNode;
  height: string;
}

export function ExpandableTab({ title, children, height }: Readonly<Props>) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <Container>
      <Header
        onClick={() => setExpanded(!expanded)}
        data-testid="header"
        radius={expanded ? "0" : "16px"}
      >
        <span>{title}</span>
        <AppIcon
          icon={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={palette.charcoal}
        />
      </Header>
      <Content height={expanded ? height : "0"}>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${palette.fullWhite};
  user-select: none;
`;

const Header = styled.div<{ radius: string }>`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-radius: 16px;
  border-bottom-left-radius: ${(props) => props.radius};
  border-bottom-right-radius: ${(props) => props.radius};
  background-color: ${palette.drawBackground};
  cursor: pointer;
  user-select: none;

  transition: border-radius 0.3s ease;

  span {
    font-size: 16px;
    font-weight: 500;
    color: ${palette.charcoal};
  }
`;

const Content = styled.div<{ height: string }>`
  overflow: hidden;
  max-height: ${(props) => props.height};
  transition: max-height 0.3s ease-in-out;
  background-color: ${palette.fullWhite};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;
