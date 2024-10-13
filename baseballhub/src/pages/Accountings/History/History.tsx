import { useEffect, useState } from "react";
import styled from "styled-components";

import { sampleHistory } from "@data/accountings";
import { HistorySimple, HistorySimpleHeader } from "@fragments/Accountings";
import { HistorySimpleType } from "@models/accountings";

export function History() {
  const [historyList, setHistoryList] = useState<HistorySimpleType[]>([]);

  useEffect(() => {
    setHistoryList(sampleHistory);
  }, []);

  return (
    <Container>
      <FiltersWrapper>
        <div>날짜 필터</div>
        <div>계좌별 필터</div>
        <div>유형 필터</div>
        <div>지출/수입 필터</div>
      </FiltersWrapper>
      <ContentWrapper>
        <HistorySimpleHeader />
        {historyList.map((history) => (
          <HistorySimple key={history.id} history={history} />
        ))}
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
