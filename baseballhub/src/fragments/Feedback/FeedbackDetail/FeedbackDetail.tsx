import styled from "styled-components";

interface Props {
  feedbackId: number;
}

export function FeedbackDetail({ feedbackId }: Readonly<Props>) {
  return (
    <Container>
      FeedbackDetail
      {feedbackId}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
