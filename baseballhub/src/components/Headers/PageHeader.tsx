import styled from "styled-components";

import { VerticalDivider } from "@components/Dividers";
import { Tabs } from "@components/Tabs";
import { Title } from "@components/Texts";

interface Props {
  title: string;
  tabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export function PageHeader({
  title,
  tabs,
  selectedTab,
  setSelectedTab,
}: Readonly<Props>) {
  return (
    <Header>
      <Title>{title}</Title>
      <VerticalDivider height="45%" bold />
      <Tabs tabs={tabs} activeTab={selectedTab} setActiveTab={setSelectedTab} />
    </Header>
  );
}

interface MobileProps {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export function MobileHeader({
  tabs,
  selectedTab,
  setSelectedTab,
}: Readonly<MobileProps>) {
  return (
    <Mobile>
      <Tabs
        tabs={tabs}
        activeTab={selectedTab}
        setActiveTab={setSelectedTab}
        textSize="small"
      />
    </Mobile>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  gap: 16px;

  position: sticky;
  top: 0;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.background700};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const Mobile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 8px;

  position: sticky;
  top: 0;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.background700};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;
