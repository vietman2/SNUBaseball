import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { AppIcon } from "@components/Icons";
import { HomecomingResultType } from "@models/events";

interface Props {
  results: HomecomingResultType;
}

export function Results({ results }: Readonly<Props>) {
  return (
    <Container>
      <Divider type="dashed" paddingRight="0" text={results.date} />
      <Contents>
        <img src={results.cover_image} alt={results.date} />
        <ResultsText>[경기 결과] {results.result}</ResultsText>
        <Subtitle>
          <AppIcon icon="results" size={24} />
          주요 기록
        </Subtitle>
        <Table>
          <tbody>
            {results.records.map((record) => (
              <tr key={record.id}>
                <td>{record.title}</td>
                <td>{record.content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 16px;

  > img {
    max-height: 280px;
    object-fit: cover;

    @media (max-width: 768px) {
      max-height: 240px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ResultsText = styled.span`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.highEmphasis};
`;

const Table = styled.table`
  border-collapse: collapse;

  td {
    text-align: center;
    padding: 8px 0;
    border: 1px solid ${({ theme }) => theme.colors.lowEmphasis};
  }

  td:first-child {
    border-left: none;
  }

  td:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    margin: 0 -16px;
    width: 100vw;
  }
`;
