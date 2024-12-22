import styled from "styled-components";

import { Chip } from "@components/Chips";
import { AppIcon } from "@components/Icons";
import { FeedbackSimpleType } from "@models/training";

interface Props {
  feedback: FeedbackSimpleType;
}

export function FeedbackCard({ feedback }: Readonly<Props>) {
  return (
    <Container>
      <div>
        <ChipWrapper>
          <Chip
            label={feedback.category.label}
            bgColor={feedback.category.background_color}
            color={feedback.category.color}
          />
        </ChipWrapper>
        <Title>
          [{feedback.player}] {feedback.title}
        </Title>
        <Content>{feedback.content}</Content>
      </div>
      <Other>
        {feedback.author}
        <IconWrapper>
          <AppIcon icon="chat" size={16} color="#0F0F70" />
          {feedback.num_comments}
        </IconWrapper>
      </Other>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  height: 160px;
  padding: 12px 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background100};

  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}`;

const ChipWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Title = styled.div`
  margin: 8px 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground700};
`;

const Content = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.foreground500};
`;

const Other = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground700};
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;
