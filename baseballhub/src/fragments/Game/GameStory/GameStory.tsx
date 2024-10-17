import { useState } from "react";
import styled from "styled-components";

import { Bases } from "@components/Bases";
import { Chip } from "@components/Chips";
import { AppIcon } from "@components/Icons";

const tabs = ["1회", "2회", "3회", "4회", "5회", "6회", "7회", "8회", "9회"];

export function GameStory() {
  const [activeTab, setActiveTab] = useState<string>("1회");

  return (
    <Container>
      <TabWrapper>
        <div>
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}>
              <Chip
                label={tab}
                bgColor={tab === activeTab ? "#0F0F70" : "#B5B6B6"}
                color={tab === activeTab ? "#E8E6F2" : "#0B1623"}
              />
            </button>
          ))}
        </div>
      </TabWrapper>
      <Relay>
        <PlateAppearance />
        <PlateAppearance />
        <PlateAppearance />
      </Relay>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
`;

const TabWrapper = styled.div`
  display: flex;
  margin: 0 8px;
  padding: 8px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  > div {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 300px;
    gap: 12px;

    white-space: nowrap;
    overflow-x: auto;
  }
`;

const Relay = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 16px;
  padding: 0 16px;
  gap: 16px;
`;

function PlateAppearance() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Wrapper>
      <Header
        onClick={() => setExpanded(!expanded)}
        radius={expanded ? "0" : "16px"}
      >
        <Info>
          <div>김유안</div>
          <Result>땅볼아웃</Result>
          <Bases first={false} second={false} third={false} />
          <div>{`${1} - ${0}, ${0} 아웃`}</div>
        </Info>
        <AppIcon
          icon={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="#0B1623"
        />
      </Header>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background100};
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
  background-color: ${({ theme }) => theme.colors.background700};
  cursor: pointer;
  user-select: none;

  transition: border-radius 0.3s ease;

  span {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const Result = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
`;
