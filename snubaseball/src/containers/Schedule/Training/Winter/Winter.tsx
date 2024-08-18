import styled from "styled-components";

import { TextDivider } from "@components/Dividers";
import { Subtitle, Title } from "@components/Texts";
import { Checkbox } from "@components/Checkbox";

export function Winter() {
  return (
    <>
      <Title title="제주도 전지훈련" subtitle="2 WEEKS" />
      <TextDivider text="CALENDAR" />
      <Horizontal>
        <Card>
          <Subtitle subtitle="DAY 1" icon="baseball" />
          <Checklist>
            <Checkbox text="체력 훈련" />
            <Checkbox text="내야 핸들링 훈련" />
            <Checkbox text="외야 스타트 훈련" />
          </Checklist>
        </Card>
        <Image>TODAY'S PHOTO</Image>
      </Horizontal>
      <Horizontal>
        <Card>
          <Subtitle subtitle="DAY 2" icon="baseball" />
          <Checklist>
            <Checkbox text="라이브 피칭/배팅 훈련" />
            <Checkbox text="주루플레이 훈련" />
            <Checkbox text="펑고 훈련" />
          </Checklist>
        </Card>
        <Image>TODAY'S PHOTO</Image>
      </Horizontal>
      <Horizontal>
        <Card>
          <Subtitle subtitle="DAY 3" icon="baseball" />
          <Checklist>
            <Checkbox text="번트 훈련" />
            <Checkbox text="중계플레이 훈련" />
            <Checkbox text="청백전" />
          </Checklist>
        </Card>
        <Image>TODAY'S PHOTO</Image>
      </Horizontal>
    </>
  );
}

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  height: 18vh;
  padding: 20px;
  gap: 20px;
`;

const Card = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 20px;
  border-radius: 15px;
  background-color: #f0f0f0;
`;

const Checklist = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 10px;
`;

const Image = styled.div`
  display: flex;
  flex: 3;
  justify-content: center;
  font-weight: bold;
  background-color: #e0e0e0;
`;
