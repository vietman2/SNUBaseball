import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent } from "@components/Fallbacks";
import { Subtitle } from "@components/Texts";
import { sampleEquipmentDetail } from "@data/management";
import { EquipmentDetailType } from "@models/management";

interface Props {
  equipmentId: number | null;
  goBack: () => void;
}

export function EquipmentDetail({ equipmentId, goBack }: Readonly<Props>) {
  const [equipment, setEquipment] = useState<EquipmentDetailType>();

  useEffect(() => {
    setEquipment(sampleEquipmentDetail);
  }, []);

  if (equipmentId === null || equipment === undefined)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <Subtitle size="large">{`[${equipment.location}] ${equipment.name}`}</Subtitle>
      </Header>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Content>
        <Subtitle>관리 요령</Subtitle>
        <div>{equipment.management_outline}</div>
      </Content>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <HistoryWrapper>
        <Subtitle>변경 내용</Subtitle>
        <HistoryHeader>
          <div>내용</div>
          <div>상세</div>

          <div>담당자</div>
          <div>날짜</div>
        </HistoryHeader>
        {equipment.history.map((history) => (
          <History key={history.id}>
            <div>{history.summary}</div>
            <div>{history.description}</div>

            <div>{history.manager}</div>
            <div>{history.date}</div>
          </History>
        ))}
      </HistoryWrapper>
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
  padding: 16px 0;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 300px;
  padding: 16px;

  color: ${({ theme }) => theme.colors.foreground500};

  > div {
    padding: 8px 0;
  }
`;

const DividerWrapper = styled.div`
  display: flex;
`;

const HistoryWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 300px;
  padding: 16px 0;
`;

const History = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;

  color: ${({ theme }) => theme.colors.foreground500};

  > div {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  > div:nth-child(1) {
    display: flex;
    flex: 2;
  }

  > div:nth-child(2) {
    display: flex;
    flex: 3;
    justify-content: flex-start;
  }
`;

const HistoryHeader = styled(History)`
  margin-top: 16px;

  color: ${({ theme }) => theme.colors.foreground900};
  font-weight: 700;

  > div:nth-child(2) {
    justify-content: center;
  }
`;
