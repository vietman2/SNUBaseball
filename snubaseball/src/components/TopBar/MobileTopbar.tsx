import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";

interface TopbarProps {
  navigate: (path: string) => void;
  openSidebar: () => void;
}

export default function MobileTopbar({ navigate, openSidebar }: TopbarProps) {
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
      <Title>{pageName}</Title>
      <Icon onClick={openSidebar}>
        <AppIcon icon="menu" size={28} color="black" />
      </Icon>
    </Bar>
  );
}

const Bar = styled.div`
  display: flex;
  flex: 1,
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 60px;
  color: #fff;

  padding: 20px 15px;
`;

const Logo = styled.div`
  display: flex;
  flex: 1;
  color: black;

  &:hover {
    cursor: pointer;
  }
}`;

const Title = styled.h1`
  display: flex;
  flex: 1;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: black;

  &:hover {
    cursor: default;
  }
`;

const Icon = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  &:hover {
    cursor: pointer;
  }
`;
