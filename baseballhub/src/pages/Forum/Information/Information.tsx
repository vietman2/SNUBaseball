import { useEffect, useState } from "react";
import styled from "styled-components";

import { Callout } from "@components/Texts";
import { sampleInformations } from "@data/forum";
import { InformationSimple } from "@fragments/Information";
import { useWindowSize } from "@hooks/useWindowSize";
import { InformationSimpleType } from "@models/forum";

export function Information() {
  const [informations, setInformations] = useState<InformationSimpleType[]>([]);

  const { width } = useWindowSize();

  useEffect(() => {
    // TODO: Fetch information data from the server
    setInformations(sampleInformations);
  }, []);

  return (
    <Container>
      <Callout text="각종 야구부 가이드" />
      <Content align={width > 768 ? "flex-start" : "center"}>
        {informations.map((information) => (
          <InformationSimple key={information.id} information={information} />
        ))}
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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${({ align }) => align};
  gap: 16px;
`;
