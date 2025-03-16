import { useEffect, useState } from "react";
import styled from "styled-components";

import { HistoryHeaderRow, HistoryRow } from "@fragments/History";
import { HistoryType } from "@models/about";
import { getHistory } from "@services/history";

export function History() {
  const [history, setHistory] = useState<HistoryType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getHistory();

      if (response) {
        setHistory(response);
      }
    };

    getData();
  }, []);

  return (
    <Container>
      <span>팀 기록</span>
      <Wrapper>
        <List>
          <HistoryHeaderRow />
          {history.map((history) => (
            <HistoryRow key={history.year} history={history} />
          ))}
        </List>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  > span:first-child {
    display: flex;
    padding: 16px 24px;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 100vw;

  overflow-x: auto;
  overflow-y: auto;
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  > div:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.background100};
  }

  > div:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.background300};
  }

  > div:first-child {
    position: sticky;
    top: 0;
    padding: 4px 0;
    font-weight: bold;

    background-color: ${({ theme }) => theme.colors.background500};
  }
`;
