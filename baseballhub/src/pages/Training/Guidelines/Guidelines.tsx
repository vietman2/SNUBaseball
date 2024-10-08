import { useState } from "react";
import styled from "styled-components";

import { MenuList } from "@components/Menus";
import { Tabs } from "@components/Tabs";
import { Callout } from "@components/Texts";
import { sampleGuidelines } from "@data/guidelines";
import { GuidelineDetail, GuidelinePreview } from "@fragments/Guideline";
import { GuidelineType } from "@models/guideline";

type TabType = {
  name: string;
  menus: string[];
};

const tabs: TabType[] = [
  {
    name: "내야수비",
    menus: ["캐칭/핸들링", "스텝", "송구", "팝플라이"],
  },
  {
    name: "외야수비",
    menus: ["플라이", "땅볼", "송구"],
  },
  {
    name: "포수수비",
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

export default function Guidelines() {
  const [selectedTab, setSelectedTab] = useState<string>("내야수비");
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [selectedSubmenu, setSelectedSubmenu] = useState<string>("");
  const [selectedGuideline, setSelectedGuideline] =
    useState<GuidelineType | null>(null);

  const setActiveTab = (tab: string) => {
    setSelectedTab(tab);
    setSelectedMenu("");
    setSelectedSubmenu("");
    setSelectedGuideline(null);
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    setSelectedSubmenu("");
    setSelectedGuideline(null);
  };

  const handleGuidelineClick = (guideline: GuidelineType) => {
    setSelectedGuideline(guideline);
  };

  return (
    <Container>
      <Title>훈련 가이드라인</Title>
      <Contents>
        <Left>
          <Callout text="함부로 좋아요 찍지마라!" />
          <Tabs
            tabs={tabs.map((tab) => tab.name)}
            activeTab={selectedTab}
            setActiveTab={setActiveTab}
          />
          <Content>
            <Wrapper>
              <MenuList
                menuitems={
                  tabs.find((tab) => tab.name === selectedTab)?.menus || []
                }
                selectedMenu={selectedMenu}
                setSelectedMenu={handleMenuClick}
                submenuitems={["정면", "포핸드", "백핸드", "대쉬"]}
                selectedSubmenu={selectedSubmenu}
                setSelectedSubmenu={setSelectedSubmenu}
              />
              {selectedSubmenu !== "" && (
                <Details>
                  <TopRow>
                    <div style={{ width: "10px" }}>No</div>
                    <div style={{ flex: 3 }}>제목</div>
                    <div style={{ flex: 2 }}>작성자</div>
                    <div style={{ flex: 2 }}>공유날짜</div>
                  </TopRow>
                  {sampleGuidelines.map((guideline) => (
                    <div
                      key={guideline.id}
                      onClick={() => handleGuidelineClick(guideline)}
                      onKeyDown={() => {}}
                    >
                      <GuidelinePreview guideline={guideline} />
                    </div>
                  ))}
                </Details>
              )}
            </Wrapper>
          </Content>
        </Left>
        <Right>
          <GuidelineDetail guideline={selectedGuideline} />
        </Right>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  height: 100%;
  margin-bottom: 1rem;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 100%;
  margin-bottom: 1rem;
  background-color: white;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  padding: 1rem 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  height: 100%;
  border: 1px solid #e0e0e0;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-left: 1rem;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;

  div {
    text-align: center;
    font-size: 1rem;
    color: #333;
  }
`;
