import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { sampleInterviews, sampleMemories } from "@data/archives";
import { Interview } from "@fragments/Interviews";
import { Memories } from "@fragments/Memories";
import { InterviewType, MemoriesType } from "@models/archive";

export function ArchiveMain() {
  const [memories, setMemories] = useState<MemoriesType[]>([]);
  const [interviews, setInterviews] = useState<InterviewType[]>([]);

  const navigate = useNavigate();

  const navigateToMemories = () => {
    navigate("/archive/memories");
  };

  const navigateToInterviews = () => {
    navigate("/archive/interviews");
  };

  useEffect(() => {
    const fetchData = async () => {
      // TODO: Fetch memories data from the server

      setMemories(sampleMemories);
      setInterviews(sampleInterviews);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Subtitle>
          MEMORIES
          <span>_순간의 기록</span>
        </Subtitle>
        {memories.map((memory) => (
          <Memories key={memory.year} memories={memory} />
        ))}
      </Wrapper>
      <Divider />
      <Button onClick={navigateToMemories} data-testid="more-memories">
        {"MORE >>"}
      </Button>
      <Wrapper>
        <Subtitle>
          INTERVIEW
          <span>_우리들의 이야기</span>
        </Subtitle>
        {interviews.map((interview) => (
          <Interview key={interview.id} interview={interview} />
        ))}
      </Wrapper>
      <Divider />
      <Button onClick={navigateToInterviews} data-testid="more-interviews">
        {"MORE >>"}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 16px 0;
  padding: 16px 0;
  gap: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 16px;
`;

const Subtitle = styled.span`
  padding: 0 16px;
  font-size: 1.5rem;
  font-weight: 700;

  > span {
    font-size: 1rem;
    font-weight: 400;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: flex-start;
  padding: 0 24px;

  color: ${({ theme }) => theme.colors.primary};
`;
