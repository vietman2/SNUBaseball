import styled from "styled-components";

import { Title } from "@components/Texts";

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

export default function GuidelinesContainer() {
  return (
    <Wrapper>
      <Header>
        <Title>훈련 가이드라인</Title>
      </Header>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div<{ $first: boolean }>`
  display: flex;
  flex: 1;
  margin: 8px;
  border-top-left-radius: ${(props) => (props.$first ? "0" : "10px")};
`;
