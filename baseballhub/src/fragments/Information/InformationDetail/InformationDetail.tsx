import { useEffect, useState } from "react";
import styled from "styled-components";

import { ErrorComponent } from "@components/Fallbacks";
import { Subtitle } from "@components/Texts";
import { sampleInformationDetail } from "@data/forum";
import { InformationDetailType } from "@models/forum";

interface Props {
  informationId: number | null;
  goBack: () => void;
}

export function InformationDetail({ informationId, goBack }: Readonly<Props>) {
  const [information, setInformation] = useState<InformationDetailType>();

  useEffect(() => {
    setInformation(sampleInformationDetail);
  }, []);

  if (informationId === null || information === undefined)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <Subtitle size="large">{information.title}</Subtitle>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
`;
