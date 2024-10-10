import styled from "styled-components";

import { PageHeader } from "@components/Headers";
import { Title } from "@components/Texts";
import { useWindowSize } from "@hooks/useWindowSize";

export default function HomeContainer() {
  const { width } = useWindowSize();

  return (
    <Container>
      {width > 768 ? (
        <PageHeader>
          <Title>Home</Title>
        </PageHeader>
      ) : (
        <div />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
