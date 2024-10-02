import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Header } from "@fragments/Header";

export function RootLayout() {
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

  const handleOrientationChange = () => {
    setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    mediaQuery.addEventListener("change", handleOrientationChange);
    return () =>
      mediaQuery.removeEventListener("change", handleOrientationChange);
  }, []);

  return (
    <>
      <Header isPortrait={isPortrait} />
      <ContentWrapper $isPortrait={isPortrait}>
        <Outlet />
      </ContentWrapper>
    </>
  );
}

const ContentWrapper = styled.div<{ $isPortrait: boolean }>`
  display: flex;
  flex: 1;
  padding: ${({ $isPortrait }) => ($isPortrait ? "0 20px" : "0 20%")};
  overflow-x: hidden;
  box-sizing: border-box;
`;
