import { useState } from "react";
import styled from "styled-components";

import { DailyTable } from "@components/Tables";

export default function Daily() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <Container>
      <Title>오늘의 훈련계획</Title>
      <div>
        <input
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </div>
      <Content>
        <Subtitle>훈련계획표</Subtitle>
        <Callout>
          참가인원: 6명
          <br />
          훈련 목표: 펑고, 배팅
          <br />
          <br />
          투수: 김유안, 유호성
          <br />
          내야: 양서진, 김택원
          <br />
          외야: 이유용, 허준서
        </Callout>
        <div>TODO 1: 훈련 목표</div>
        <div>TODO 2: 일일코치</div>
        <div>TODO 3: 훈련 관련 영상 링크</div>
        <DailyTable />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
  height: 100vh;
  padding: 0 20px;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;

const Content = styled.div`
  flex: 1;
  background-color: white;
  padding: 1rem 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Subtitle = styled.h3`
  margin: 0 0 1rem 0;
`;

const Callout = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-left: 5px solid #0f0f70;
`;
