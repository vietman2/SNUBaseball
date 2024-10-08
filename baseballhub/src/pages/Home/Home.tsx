import styled from "styled-components";

import { PageHeader } from "@components/Headers";
import { Title } from "@components/Texts";
import { useWindowSize } from "@hooks/useWindowSize";

export default function Home() {
  const { width } = useWindowSize();

  return (
    <Container>
      {width > 768 ? (
        <PageHeader>
          <Title>Home</Title>
        </PageHeader>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  flex-direction: column;
`;
