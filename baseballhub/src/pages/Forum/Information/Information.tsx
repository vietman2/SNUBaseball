import styled from "styled-components";

import { Callout } from "@components/Texts";
import { InformationSimple } from "@fragments/Information";
import { useWindowSize } from "@hooks/useWindowSize";

export function Information() {
  const { width } = useWindowSize();

  return (
    <Container>
      <Callout text="각종 야구부 가이드" />
      <Content align={width > 768 ? "flex-start" : "center"}>
        <InformationSimple />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 16px 8px 28px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const Content = styled.div<{ align: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align};
  gap: 16px;
`;
