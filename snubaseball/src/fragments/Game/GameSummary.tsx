import styled from "styled-components";

import { Subtitle } from "@components/Texts";

interface Props {
  result: string;
}

export function GameSummary({ result }: Props) {
  return (
    <Container>
      <Image>PHOTO</Image>
      <Results>[경기 결과] OB {result} YB</Results>
      <Subtitle subtitle="주요 기록" icon="baseball" />
      <KeyRecords>
        <Record>
          <Inning>3회 말</Inning>
          <Detail>000 타자의 2타점 적시타</Detail>
        </Record>
        <Record>
          <Inning>4회 초</Inning>
          <Detail>000 투수의 1사 만루 위기 극복</Detail>
        </Record>
        <Record>
          <Inning>9회 말</Inning>
          <Detail>000 타자의 끝내기 안타</Detail>
        </Record>
      </KeyRecords>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  margin-bottom: 40px;
`;

// TODO: Replace this to img tag
const Image = styled.div`
  display: flex;
  width: 100%;
  height: 15vh;
  justify-content: center;
  font-weight: bold;
  background-color: #e0e0e0;
`;

const Results = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-weight: bold;
  color: #0f0f70;
`;

const KeyRecords = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-top: 1px solid #cecece;
`;

const Record = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cecece;
`;

const Inning = styled.div`
  display: flex;
  flex: 4;
  justify-content: center;
  font-size: 16px;
  border-right: 1px solid #cecece;
  padding: 5px 10px;
`;

const Detail = styled.div`
  display: flex;
  flex: 6;
  justify-content: center;
  font-size: 16px;
  padding: 5px 10px;
`;
