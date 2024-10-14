import { useEffect, useState } from "react";
import styled from "styled-components";

import { ErrorComponent } from "@components/Fallbacks";
import { Subtitle } from "@components/Texts";
import { sampleFeedbackDetail } from "@data/notes";
import { FeedbackDetailType } from "@models/notes";

interface Props {
  feedbackId: number | null;
  goBack: () => void;
}

export function FeedbackDetail({ feedbackId, goBack }: Readonly<Props>) {
  const [feedback, setFeedback] = useState<FeedbackDetailType>();

  useEffect(() => {
    setFeedback(sampleFeedbackDetail);
  }, []);

  if (feedbackId === null || feedback === undefined)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <Subtitle size="large">{feedback.title}</Subtitle>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
`;
