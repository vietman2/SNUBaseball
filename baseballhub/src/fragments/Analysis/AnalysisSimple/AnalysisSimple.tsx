import styled from "styled-components";

import { AnalysisSimpleType } from "@models/notes";

interface Props {
  analysis: AnalysisSimpleType;
}

export function AnalysisSimple({ analysis }: Readonly<Props>) {
  return (
    <Container>
      <img src={analysis.cover_image} alt="analysis" />
      <div>
        <div>{analysis.title}</div>
        <div>{analysis.date}</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 220px;
  padding: 16px 0;
  gap: 8px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background100};

  img {
    width: 280px;
    height: 140px;
    object-fit: cover;
  }

  > div {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;

    > div:first-child {
      color: ${({ theme }) => theme.colors.foreground900};
      font-size: 18px;
      font-weight: 700;
    }

    > div:last-child {
      color: ${({ theme }) => theme.colors.foreground500};
      font-size: 14px;
      font-weight: 400;
    }
  }
`;
