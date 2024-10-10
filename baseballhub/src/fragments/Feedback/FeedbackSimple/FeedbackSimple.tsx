import styled from "styled-components";

import { FeedbackType } from "@models/notes";

interface Props {
  feedback: FeedbackType;
}

export function FeedbackSimple({ feedback }: Readonly<Props>) {
  return (
    <Container>
      <Title>{feedback.title}</Title>
      <Content>{feedback.content}</Content>
      {feedback.player}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background100};
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const Content = styled.div`
  font-size: 18px;
  font-weight: 400;
`;
