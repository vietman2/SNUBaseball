import styled from "styled-components";

import { GuidelineType } from "@models/guideline";

interface Props {
  guideline: GuidelineType;
}

export function GuidelinePreview({ guideline }: Props) {
  return (
    <Container>
      <div style={{ width: "10px" }}>{guideline.id}</div>
      <div style={{ flex: 3 }}>{guideline.title}</div>
      <div style={{ flex: 2 }}>{guideline.shared_by}</div>
      <div style={{ flex: 2 }}>{guideline.shared_at}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;

  div {
    text-align: center;
  }
`;
