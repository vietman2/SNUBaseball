import { useState } from "react";
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
  padding: 0 250px;
`;

const Logo = styled.h1`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  color: black;

  &:hover {
    cursor: default;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex: 5;
  justify-content: center;
  gap: 100px;
`;

const TabText = styled.h3`
  margin: 0;
  font-size: 16px;
  color: black;
  cursor: pointer;
`;

const Icon = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

interface Props {
  open: boolean;
}

const FullMenu = styled.div<Props>`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background: #333;
  color: white;
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: row;
  align-items: center;
  padding: 1rem 0;
  z-index: 999;
`;

interface TopbarProps {
  navigate: (path: string) => void;
}

export default function FullTopBar({ navigate }: TopbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Bar>
        <Logo onClick={() => handleNavigate("/")}>로고</Logo>
        <Tabs
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-testid="tabs"
        >
          <TabText onClick={() => handleNavigate("/about")}>소개</TabText>
          <TabText onClick={() => handleNavigate("/schedule")}>일정</TabText>
          <TabText onClick={() => handleNavigate("/archive")}>아카이브</TabText>
          <TabText onClick={() => handleNavigate("/sitemap")}>사이트맵</TabText>
          <TabText onClick={() => handleNavigate("/ask")}>문의</TabText>
        </Tabs>
        <Icon>
          <AppIcon icon="user" size={20} color="black" />
        </Icon>
      </Bar>
      <FullMenu open={isMenuOpen}>
        <div>
          <div>사진</div>
          <div>인터뷰</div>
        </div>
        <div>
          <div>인스타그램</div>
          <div>유튜브</div>
        </div>
        <div>
          <div>입부 신청</div>
          <div>FAQ</div>
        </div>
        <div>
          <div>팀소개</div>
          <div>선수 매니저</div>
          <div>지도자</div>
        </div>
        <div>
          <div>경기</div>
        </div>
      </FullMenu>
    </>
  );
}
