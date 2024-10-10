import { useEffect, useState } from "react";
import styled from "styled-components";

import { sampleFeedbacks } from "@data/notes";
import { FeedbackSimple } from "@fragments/Feedback";
import { FeedbackType } from "@models/notes";

export function Feedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);

  useEffect(() => {
    //TODO: fetch feedbacks
    setFeedbacks(sampleFeedbacks);
  }, []);

  return (
    <Container>
      필터 기능 추가하기
      <Body>
        {feedbacks.map((feedback) => (
          <FeedbackSimple key={feedback.id} feedback={feedback} />
        ))}
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
`;
