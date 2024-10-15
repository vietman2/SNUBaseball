import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider } from "@components/Dividers";
import { ErrorComponent } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { Subtitle } from "@components/Texts";
import { sampleHistoryDetail } from "@data/accountings";
import { HistoryDetailType } from "@models/accountings";

interface Props {
  historyId: number | null;
  goBack: () => void;
}

export function HistoryDetail({ historyId, goBack }: Readonly<Props>) {
  const [history, setHistory] = useState<HistoryDetailType>();

  const formatAmountText = (amount: number, type: string) => {
    const amountText = amount.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    });

    return type === "수입" ? `+ ${amountText}` : `- ${amountText}`;
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
  };

  useEffect(() => {
    setHistory(sampleHistoryDetail);
  }, []);

  if (historyId === null || history === undefined)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <Subtitle size="large">거래내역</Subtitle>
        <Summary>
          <AppIcon
            icon={history.type === "수입" ? "arrow-down" : "arrow-up"}
            color="black"
            size={36}
          />
          <div>
            <div>{history.description}</div>
            <div>{history.type}</div>
          </div>
          <div>{formatAmountText(history.amount, history.type)}</div>
        </Summary>
      </Header>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Details>
        <Subtitle>거래 내용</Subtitle>
        <DetailRow>
          <div>거래일</div>
          <div>{history.date}</div>
        </DetailRow>
        <DetailRow>
          <div>거래처</div>
          <div>{history.counterparty}</div>
        </DetailRow>
        <DetailRow>
          <div>거래유형</div>
          <div>
            <Chip
              label={history.category.name}
              bgColor={history.category.color}
              color="white"
            />
          </div>
        </DetailRow>
        <DetailRow>
          <div>거래금액</div>
          <div>{formatAmount(history.amount)}</div>
        </DetailRow>
        <DetailRow>
          <div>거래계좌</div>
          <div>{history.account}</div>
        </DetailRow>
        <DetailRow>
          <div>거래 후 잔액</div>
          <div>{formatAmount(history.balance)}</div>
        </DetailRow>
        <DetailRow>
          <div>결제방식</div>
          <div>{history.method}</div>
        </DetailRow>
        <DetailRow>
          <div>담당자</div>
          <div>{history.manager}</div>
        </DetailRow>
      </Details>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Footer>
        <Subtitle>비고</Subtitle>
        <div>{history.note}</div>
      </Footer>
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
  gap: 16px;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  gap: 16px;

  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 16px;

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 4px;

    color: ${({ theme }) => theme.colors.foreground500};
    font-weight: 700;

    > div:nth-child(2) {
      font-size: 14px;
      font-weight: 500;
    }
  }

  > div:nth-child(3) {
    display: flex;
    flex: 1;
    justify-content: flex-end;

    color: ${({ theme }) => theme.colors.foreground900};
    font-size: 28px;
    font-weight: 700;
  }
`;

const Details = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  min-height: 300px;
  gap: 16px;

  > div {
    padding: 0 16px;
  }

  > div:first-child {
    margin-bottom: 16px;
  }
`;

const DetailRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const DividerWrapper = styled.div`
  display: flex;
  margin: 16px 0;
`;

const Footer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground500};

  > div {
    padding: 0 16px;
  }
`;
