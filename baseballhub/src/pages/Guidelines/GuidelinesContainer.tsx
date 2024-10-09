import { useState } from "react";
import styled from "styled-components";

import { VerticalDivider } from "@components/Dividers";
import { MobileHeader, PageHeader } from "@components/Headers";
import { ChipTabs, Tabs } from "@components/Tabs";
import { Title } from "@components/Texts";
import { sampleGuidelines } from "@data/guidelines";
import { GuidelineDetail, GuidelinePreview } from "@fragments/Guideline";
import { useWindowSize } from "@hooks/useWindowSize";
import { GuidelineType } from "@models/guideline";

type TabType = {
  name: string;
  menus: string[];
};

const tabs: TabType[] = [
  {
    name: "내야",
    menus: ["캐칭/핸들링", "스텝", "송구", "팝플라이"],
  },
  {
    name: "외야",
    menus: ["플라이", "땅볼", "송구"],
  },
  {
    name: "포수",
    menus: ["송구", "블로킹", "캐치"],
  },
  {
    name: "투구",
    menus: ["피칭", "PFP"],
  },
  {
    name: "타격",
    menus: ["피칭", "타격"],
  },
  {
    name: "주루",
    menus: ["타자주자", "1루주자", "2루주자", "3루주자"],
  },
  {
    name: "기타",
    menus: ["컨디셔닝", "트레이닝", "웨이트", "기타"],
  },
];

export default function GuidelinesContainer() {
  const [selectedTab, setSelectedTab] = useState<TabType>(tabs[0]);
  const [selectedMenu, setSelectedMenu] = useState<string>(tabs[0].menus[0]);
  const [selectedGuideline, setSelectedGuideline] =
    useState<GuidelineType | null>(null);

  const setActiveTab = (tab: TabType) => {
    setSelectedTab(tab);
    setSelectedMenu(tab.menus[0]);
    setSelectedGuideline(null);
  };

  const handleGuidelineClick = (guideline: GuidelineType) => {
    setSelectedGuideline(guideline);
  };

  const { width } = useWindowSize();

  return (
    <Container>
      {width > 768 ? (
        <PageHeader>
          <Title>훈련 가이드라인</Title>
          <VerticalDivider height="45%" bold />
          <Tabs
            tabs={tabs.map((tab) => tab.name)}
            activeTab={selectedTab.name}
            setActiveTab={(tab) =>
              setActiveTab(tabs.find((t) => t.name === tab)!)
            }
          />
        </PageHeader>
      ) : (
        <MobileHeader>
          <Tabs
            tabs={tabs.map((tab) => tab.name)}
            activeTab={selectedTab.name}
            setActiveTab={(tab) =>
              setActiveTab(tabs.find((t) => t.name === tab)!)
            }
            textSize="small"
          />
        </MobileHeader>
      )}
      {selectedGuideline ? (
        <Content>
          <GuidelineDetail
            guideline={selectedGuideline}
            goBack={() => setSelectedGuideline(null)}
          />
        </Content>
      ) : (
        <Content>
          <TabsWrapper>
            <ChipTabs
              options={selectedTab.menus}
              selected={selectedMenu}
              onSelect={setSelectedMenu}
            />
          </TabsWrapper>
          <Wrapper align={width > 768 ? "flex-start" : "center"}>
            {sampleGuidelines.map((guideline) => (
              <button
                key={guideline.id}
                onClick={() => handleGuidelineClick(guideline)}
                data-testid={`guideline-${guideline.id}`}
              >
                <GuidelinePreview guideline={guideline} />
              </button>
            ))}
          </Wrapper>
        </Content>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 12px;
  padding: 12px 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const TabsWrapper = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const Wrapper = styled.div<{ align: string }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: ${({ align }) => align};
  gap: 16px;
`;
