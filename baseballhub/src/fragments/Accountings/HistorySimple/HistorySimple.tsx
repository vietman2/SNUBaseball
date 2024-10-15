import styled from "styled-components";

import { Chip } from "@components/Chips";
import { useWindowSize } from "@hooks/useWindowSize";
import { HistorySimpleType } from "@models/accountings";

export function HistorySimpleHeader() {
  const { width } = useWindowSize();

  return (
    <Header>
      {width > 768 && <SmallCell>유형</SmallCell>}
      <SmallCell>분류</SmallCell>
      <MediumHeader>금액</MediumHeader>
      <LargeHeader>내용</LargeHeader>
      {width > 768 && <SmallCell>날짜</SmallCell>}
      {width > 1024 && <SmallCell>결제방식</SmallCell>}
    </Header>
  );
}

interface Props {
  history: HistorySimpleType;
}

export function HistorySimple({ history }: Readonly<Props>) {
  const { width } = useWindowSize();

  const renderAmount = (amount: number) => {
    return `${amount.toLocaleString("ko-KR")}`;
  };

  return (
    <Container>
      {width > 768 && (
        <SmallCell>
          <TypeChip type={history.type} />
        </SmallCell>
      )}
      <SmallCell>
        <Category color={history.category.color}>
          <Dot color={history.category.color} />
          {history.category.name}
        </Category>
      </SmallCell>
      <MediumCell>{renderAmount(history.amount)}원</MediumCell>
      <LargeCell>{history.description}</LargeCell>
      {width > 768 && <SmallCell>{history.date}</SmallCell>}
      {width > 1024 && <SmallCell>{history.method}</SmallCell>}
    </Container>
  );
}

interface TypeProps {
  type: string;
}

function TypeChip({ type }: Readonly<TypeProps>) {
  if (type === "수입") {
    return <Chip label="수입" color="#D4EDDA" bgColor="#007BFF" />;
  } else {
    return <Chip label="지출" color="#E9ECEF" bgColor="#DC3545" />;
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground700};
`;

const SmallCell = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const MediumCell = styled.div`
  display: flex;
  flex: 2;
  justify-content: flex-start;
`;

const LargeCell = styled.div`
  display: flex;
  flex: 3;
  justify-content: flex-start;
`;

const MediumHeader = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
`;

const LargeHeader = styled.div`
  display: flex;
  flex: 3;
  justify-content: center;
`;

const Header = styled(Container)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.foreground900};

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background900};
`;

const Category = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;

  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground500};

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background500};
`;

const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;
