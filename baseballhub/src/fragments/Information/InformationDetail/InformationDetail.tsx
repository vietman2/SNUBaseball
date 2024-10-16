import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { Subtitle } from "@components/Texts";
import { InformationDetailType } from "@models/forum";
import { getInformationDetails } from "@services/board";

interface Props {
  informationId: number | null;
  goBack: () => void;
}

export function InformationDetail({ informationId, goBack }: Readonly<Props>) {
  const [information, setInformation] = useState<InformationDetailType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchInformationDetails = async () => {
      if (informationId === null) return;

      setLoading(true);
      const response = await getInformationDetails(informationId);

      if (response) {
        setInformation(response.data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchInformationDetails();
  }, [informationId]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (informationId === null || information === undefined || error)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <Subtitle size="large">{information.title}</Subtitle>
        <Metadata>
          <div>{information.author.name}</div>
          <div>{information.created_at}</div>
        </Metadata>
      </Header>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Content>
        <div>{information.content}</div>
      </Content>
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
  padding: 16px 0 8px 0;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding: 8px 16px;
  gap: 8px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 8px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const DividerWrapper = styled.div`
  display: flex;
`;
