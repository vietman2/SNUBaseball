import styled from "styled-components";

import { Chip } from "@components/Chips";
import { AppIcon } from "@components/Icons";
import { FeedbackSimpleType } from "@models/training";

export function FeedbackTableHeader() {
  return (
    <Header>
      <div>
        <AppIcon icon="text" size={20} color="#212529" />
        제목
      </div>
      <div>
        <AppIcon icon="person" size={16} color="#212529" />
        작성자
      </div>
      <div>
        <AppIcon icon="category" size={20} color="#212529" />
        분류
      </div>
      <div>
        <AppIcon icon="status" size={20} color="#212529" />
        상태
      </div>
      <div>
        <AppIcon icon="calendar" size={20} color="#212529" />
        날짜
      </div>
    </Header>
  );
}

interface Props {
  feedback: FeedbackSimpleType;
}

export function FeedbackTableRow({ feedback }: Readonly<Props>) {
  return (
    <Container>
      <div>
        [{feedback.player}] {feedback.title}
      </div>
      <div>{feedback.author}</div>
      <div>
        <Chip
          label={feedback.category.label}
          color={feedback.category.color}
          bgColor={feedback.category.background_color}
        />
      </div>
      <div>
        <Status background_color={feedback.status.background_color}>
          <Dot color={feedback.status.color} />
          {feedback.status.label}
        </Status>
      </div>
      <div>{feedback.created_at}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 1rem;
  color: ${({ theme }) => theme.colors.foreground700};

  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100px;
    height: 36px;
    padding: 8px;
    gap: 6px;

    white-space: nowrap;

    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  }

  > div:first-child {
    flex: 1;
    min-width: 240px;
    max-width: 400px;
  }
`;

const Header = styled(Container)`
  color: ${({ theme }) => theme.colors.foreground900};
  font-weight: 700;

  border-top: none;

  > div {
    height: 32px;
  }
`;

const Status = styled.div<{ background_color: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;

  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.background100};

  border-radius: 8px;
  background-color: ${({ background_color }) => background_color};
`;

const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;

  background-color: ${({ color }) => color};
`;
