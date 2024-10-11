import styled from "styled-components";

import { FeedbackType } from "@models/notes";

interface Props {
  feedback: FeedbackType;
}

export function FeedbackDetail({ feedback }: Readonly<Props>) {
  return (
    <Container>
      FeedbackDetail
      {feedback.title}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
