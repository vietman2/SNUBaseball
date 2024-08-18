import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Props {
  open: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ open, toggleSidebar }: Readonly<Props>) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);

    toggleSidebar();
  };

  return (
    <>
      <Container open={open}>
        <Logo onClick={() => handleNavigate("/")}>로고</Logo>
        <AuthTabs>
          <AuthTab onClick={() => handleNavigate("/login")}>로그인</AuthTab>
          <AuthTab onClick={() => handleNavigate("/signup")}>회원가입</AuthTab>
        </AuthTabs>
        <SidebarTab onClick={() => handleNavigate("/about")}>소개</SidebarTab>
        <SidebarTab onClick={() => handleNavigate("/schedule")}>
          일정
        </SidebarTab>
        <SidebarTab onClick={() => handleNavigate("/archive")}>
          아카이브
        </SidebarTab>
        <SidebarTab onClick={() => handleNavigate("/sitemap")}>
          사이트맵
        </SidebarTab>
        <SidebarTab onClick={() => handleNavigate("/ask")}>문의</SidebarTab>
      </Container>
      <Overlay open={open} onClick={toggleSidebar} />
    </>
  );
}

interface SimpleProps {
  open: boolean;
}

const Container = styled.div<SimpleProps>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background: #fff;
  color: black;
  padding-top: 1rem;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  font-size: 24px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const AuthTabs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 10px 5px;

  background-color: #0f0f70;
`;

const AuthTab = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const SidebarTab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 20px 0px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: #0f0f70;
    color: white;
  }
`;

const Overlay = styled.div<SimpleProps>`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
