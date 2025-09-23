import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import { TabType } from "../../models/tabs";

interface Props {
  tab: TabType;
}

export function TabItemMobile({ tab }: Readonly<Props>) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  if (tab.type === "SIMPLE") {
    return (
      <TabLink href={tab.href} passHref>
        {tab.label}
      </TabLink>
    );
  }

  return (
    <TabButtonWrapper>
      <TabButton
        onClick={toggleSubmenu}
        $isOpen={isSubmenuOpen}
        aria-expanded={isSubmenuOpen}
        aria-controls={`${tab.label}-submenu`}
      >
        {tab.label}
      </TabButton>
      <SidebarSubmenu id={`${tab.label}-submenu`} $isOpen={isSubmenuOpen}>
        <div className="submenu-inner">
          {tab.submenu.map((item) => (
            <Link key={item.label} href={item.href} passHref>
              {item.label}
            </Link>
          ))}
        </div>
      </SidebarSubmenu>
    </TabButtonWrapper>
  );
}

const TabLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
`;

const TabButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
`;

const TabButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
`;

const SidebarSubmenu = styled.div<{ $isOpen?: boolean }>`
  /* 슬라이드/접힘을 위한 핵심 */
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
  overflow: hidden;

  /* 시각적 보강 */
  background-color: ${({ theme }) => theme.colors.gray300};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: grid-template-rows 0.28s ease-in-out, opacity 0.28s ease-in-out;
  will-change: grid-template-rows, opacity;

  /* 내부 래퍼가 실제 높이를 담당 */
  .submenu-inner {
    overflow: hidden;
  }

  /* 링크 스타일 */
  .submenu-inner > a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 400;

    /* 살짝 페이드/슬라이드 업 효과 추가 */
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateY(0)" : "translateY(-4px)"};
    transition: transform 0.28s ease-in-out;
  }

  /* 닫힐 때 포인터 차단 (탭 포커스도 막고 싶다면 aria-hidden 병행) */
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};

  /* 사용자 환경설정: 모션 최소화 */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    .submenu-inner > a {
      transition: none;
      transform: none;
    }
  }
`;
