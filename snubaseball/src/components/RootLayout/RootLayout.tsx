import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Header } from "@fragments/Header";
import { useWindowSize } from "@hooks/useWindowSize";

export function RootLayout() {
  const [isWide, setIsWide] = useState<boolean>(true);

  const { width } = useWindowSize();

  useEffect(() => {
    setIsWide(width > 1024);
  }, [width]);

  return (
    <>
      <Header isWide={isWide} />
      <ContentWrapper $iswide={isWide}>
        <Outlet />
      </ContentWrapper>
    </>
  );
}

const ContentWrapper = styled.div<{ $iswide: boolean }>`
  display: flex;
  flex: 1;
  padding: ${({ $iswide }) => ($iswide ? "0 20%" : "0 20px")};

  overflow-x: hidden;
  box-sizing: border-box;
`;
