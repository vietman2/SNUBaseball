import { useState } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";

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
          color="#0B1623"
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
  background-color: ${({ theme }) => theme.colors.offWhite};
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
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  user-select: none;

  transition: border-radius 0.3s ease;

  span {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Content = styled.div<{ height: string }>`
  overflow: hidden;
  max-height: ${(props) => props.height};
  transition: max-height 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.colors.offWhite};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;
