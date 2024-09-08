import { useState } from "react";
import styled from "styled-components";

import { Tabs } from "@components/Tabs";
import { MenuList } from "@components/Menus";
import { IFrame } from "@components/Frames";

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

  return (
    <>
      <Container>
        <Title>훈련 가이드라인</Title>
        <Tabs
          tabs={tabs.map((tab) => tab.name)}
          activeTab={selectedTab}
          setActiveTab={setSelectedTab}
        />
        <Content>
          <Wrapper>
            <MenuList
              menuitems={
                tabs.find((tab) => tab.name === selectedTab)?.menus || []
              }
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              submenuitems={["정면", "포핸드", "백핸드", "대쉬"]}
              selectedSubmenu={selectedSubmenu}
              setSelectedSubmenu={setSelectedSubmenu}
            />
            {selectedSubmenu !== "" && (
              <Details>
                <Subtitle>{selectedSubmenu}</Subtitle>
                <IFrame videoId="Ak0IsTIKpF4" width="1000" height="600" />
              </Details>
            )}
          </Wrapper>
        </Content>
      </Container>
      
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 1rem 0;
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
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 1rem;
`;

const Subtitle = styled.h3`
  margin: 1rem 0;
`;
