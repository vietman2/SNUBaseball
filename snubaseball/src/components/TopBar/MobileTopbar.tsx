import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 0 15px;
`;

const Logo = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  color: black;

  &:hover {
    cursor: pointer;
  }
}`;

const Title = styled.h1`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: black;

  &:hover {
    cursor: default;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex: 8;
  justify-content: center;
  gap: 100px;
`;

const Icon = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  &:hover {
    cursor: pointer;
  }
`;

interface TopbarProps {
  isPortrait: boolean;
  navigate: (path: string) => void;
  openSidebar: () => void;
}

export default function MobileTopbar({
  isPortrait,
  navigate,
  openSidebar,
}: TopbarProps) {
  const location = useLocation();

  const routeNameMap: { [key: string]: string } = {
    "/": "서울대 야구부",
    "/about": "소개",
    "/schedule": "일정",
    "/archive": "아카이브",
    "/sitemap": "사이트맵",
    "/ask": "문의",
  };

  const pageName = routeNameMap[location.pathname] || "서울대 야구부";

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Bar>
      <Logo onClick={() => handleNavigate("/")}>로고</Logo>
      <Tabs>
        <Title>{pageName}</Title>
      </Tabs>
      <Icon onClick={openSidebar}>
        <AppIcon icon="menu" size={28} color="black" />
      </Icon>
    </Bar>
  );
}
