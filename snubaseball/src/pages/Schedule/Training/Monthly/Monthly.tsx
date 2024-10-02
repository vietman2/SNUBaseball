import styled from "styled-components";

import { TextDivider } from "@components/Dividers";
import { SimpleTable, TableRow } from "@components/Tables";
import { Subtitle, Title } from "@components/Texts";

export function Monthly() {
  return (
    <>
      <Title title="08" subtitle="August" />
      <TextDivider text="CALENDAR" />
      <Image src="https://kr.object.ncloudstorage.com/snubaseball.test/schedule/August_2024.png" />
      <Subtitle subtitle="주요 일정" icon="baseball" />
      <SimpleTable>
        <TableRow left="08.03(토)" right="펑고 집중 훈련" />
        <TableRow left="08.12(월) ~ 08.20(화)" right="여름 합숙 훈련" />
        <TableRow left="08.25(토) ~ 08.31(토)" right="체력 측정 주간" />
      </SimpleTable>
    </>
  );
}

const Image = styled.img`
  display: flex;
  width: 90%;
  height: 30vh;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
`;
