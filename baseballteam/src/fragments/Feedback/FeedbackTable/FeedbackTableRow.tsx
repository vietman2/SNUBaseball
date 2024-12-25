import styled from "styled-components";

import { Chip } from "@components/Chips";
import { AppIcon } from "@components/Icons";
import { FeedbackSimpleType } from "@models/training";

export function FeedbackTableHeader() {
  return (
    <Header>
      <div />
      <div>
        <AppIcon icon="text" size={20} color="#212529" />
        <span>제목</span>
      </div>
      <div>
        <AppIcon icon="people" size={16} color="#212529" />
        <span>작성자</span>
      </div>
      <div>
        <AppIcon icon="category" size={20} color="#212529" />
        <span>분류</span>
      </div>
      <div>
        <AppIcon icon="status" size={20} color="#212529" />
        <span>상태</span>
      </div>
      <div>
        <AppIcon icon="calendar" size={20} color="#212529" />
        <span>작성일</span>
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
      <div>{feedback.id}</div>
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
        <Status
          $bgColor={feedback.status.background_color}
          $color={feedback.status.color}
        >
          <Dot $color={feedback.status.color} />
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

  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.foreground700};

  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 32px;
    padding: 8px;
    gap: 6px;

    white-space: nowrap;

    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};

    @media (max-width: 768px) {
      width: 60px;
    }
  }

  > div:first-child {
    width: 60px;

    @media (max-width: 768px) {
      width: 40px;
    }
  }

  > div:nth-child(2) {
    flex: 1;
    justify-content: flex-start;
    min-width: 240px;
    max-width: 400px;

    @media (max-width: 768px) {
      min-width: 80px;
      max-width: 360px;
    }
  }

  > div:nth-child(5) {
    @media (max-width: 768px) {
      border-right: none;
    }
  }

  > div:last-child {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Header = styled(Container)`
  color: ${({ theme }) => theme.colors.foreground900};
  font-weight: 700;

  border-top: none;

  > div:nth-child(2) {
    justify-content: center;
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const Status = styled.div<{ $color: string; $bgColor: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;

  font-size: 0.9rem;
  color: ${({ $color }) => $color};

  border-radius: 8px;
  background-color: ${({ $bgColor }) => $bgColor};
`;

const Dot = styled.div<{ $color: string }>`
  position: relative;
  top: 1px;
  width: 8px;
  height: 8px;
  border-radius: 50%;

  background-color: ${({ $color }) => $color};
`;
