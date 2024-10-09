import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Header } from "@fragments/Header";

export function RootLayout() {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;

  overflow-x: hidden;
  box-sizing: border-box;
`;
