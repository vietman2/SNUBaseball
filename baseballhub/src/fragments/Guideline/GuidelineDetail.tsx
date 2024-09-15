import styled from "styled-components";

import { IFrame } from "@components/Frames";
import { GuidelineType } from "@models/guideline";

interface Props {
  guideline: GuidelineType | null;
}

export function GuidelineDetail({ guideline }: Props) {
  if (!guideline) return null;

  return (
    <Container>
      <Title>{guideline.title}</Title>
      <div>
        <p>공유자: {guideline.shared_by}</p>
        <p>{guideline.shared_at}</p>
      </div>
      <IFrame videoId={guideline.video_id} width="90%" height="400vh" />
      <Content>
        <p>{guideline.description}</p>
      </Content>
      <CommentsList>
        <CommentItem>심민수: ㅎㅎㅎㅎㅎㅎ</CommentItem>
        <CommentItem>윤동현: ㅋㅋㅋㅋㅋㅋ</CommentItem>
      </CommentsList>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const CommentsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
`;
