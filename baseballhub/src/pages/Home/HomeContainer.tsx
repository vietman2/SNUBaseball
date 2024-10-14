import styled from "styled-components";

import { ComingSoon } from "@components/Fallbacks";
import { PageHeader } from "@components/Headers";
import { useWindowSize } from "@hooks/useWindowSize";

export default function HomeContainer() {
  const { width } = useWindowSize();

  return (
    <Container>
      {width > 768 ? (
        <PageHeader
          title="Home"
          tabs={[]}
          selectedTab={""}
          setSelectedTab={() => {}}
        />
      ) : (
        <div />
      )}
      <Content>
        <ComingSoon />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  margin: 8px;
`;
