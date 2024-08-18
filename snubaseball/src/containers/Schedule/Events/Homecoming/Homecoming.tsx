import styled from "styled-components";

import { TextDivider } from "@components/Dividers";
import { SimpleTable, TableRow } from "@components/Tables";
import { Caption, Subtitle, Title } from "@components/Texts";

const subtitle =
  "OB전은 야구부를 졸업한 선배님들이 오시는 행사입니다.\n1년에 한 번 선배님들과의 정기적인 만남을 통해 후배들은 선배님들께 감사의 인사를,\n선배님들은 후배들에게 아낌없는 조언과 격려를 전하며 하나된 야구부를 만들어갑니다.";

export function Homecoming() {
  return (
    <>
      <Title title="OB전" subtitle="야구부의 과거와 현재" />
      <Caption text={subtitle} />
      <TextDivider text="2024.10.01" />
      <GameSummary>
        <Image>PHOTO</Image>
        <Results>[경기 결과] OB 7:8 YB</Results>
        <Subtitle subtitle="주요 기록" icon="baseball" />
        <SimpleTable>
          <TableRow left="3회 말" right="000 타자의 2타점 적시타" />
          <TableRow left="4회 초" right="000 투수의 1사 만루 위기 극복" />
          <TableRow left="9회 말" right="000 타자의 끝내기 안타" />
        </SimpleTable>
      </GameSummary>
      <TextDivider text="2023.09.29" />
      <GameSummary>
        <Image>PHOTO</Image>
        <Results>[경기 결과] OB 4:7 YB</Results>
        <Subtitle subtitle="주요 기록" icon="baseball" />
        <SimpleTable>
          <TableRow left="3회 말" right="000 타자의 2타점 적시타" />
          <TableRow left="4회 초" right="000 투수의 1사 만루 위기 극복" />
          <TableRow left="9회 말" right="000 타자의 끝내기 안타" />
        </SimpleTable>
      </GameSummary>
    </>
  );
}

const GameSummary = styled.div`
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
