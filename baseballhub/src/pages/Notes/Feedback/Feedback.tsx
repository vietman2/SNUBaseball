import { useState } from "react";
import styled from "styled-components";

import { FeedbackList } from "@fragments/Feedback";
import { FeedbackType } from "@models/notes";

export function Feedback() {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackType | null>(
    null
  );

  return <Container>{selectedFeedback ? null : <FeedbackList />}</Container>;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;
