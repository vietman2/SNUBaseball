import { useState } from "react";
import styled from "styled-components";

import { FeedbackDetail, FeedbackList } from "@fragments/Feedback";

export function Feedback() {
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(
    null
  );

  return (
    <Container>
      {selectedFeedbackId ? (
        <FeedbackDetail feedbackId={selectedFeedbackId} />
      ) : (
        <FeedbackList onSelect={setSelectedFeedbackId} />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;
