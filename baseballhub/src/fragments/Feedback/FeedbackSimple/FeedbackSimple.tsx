import styled from "styled-components";

import { Chip } from "@components/Chips";
import { AppIcon } from "@components/Icons";
import { FeedbackSimpleType } from "@models/notes";

interface SimpleProps {
  feedback: FeedbackSimpleType;
}

export function FeedbackSimple({ feedback }: Readonly<SimpleProps>) {
  return (
    <Feedback>
      <ChipWrapper>
        <Chip
          label={feedback.category.label}
          bgColor={feedback.category.background_color}
          color={feedback.category.color}
        />
      </ChipWrapper>
      <Title>{feedback.title}</Title>
      <Content>{feedback.content}</Content>
      <Other>
        {feedback.player}
        <IconWrapper>
          <AppIcon icon="chat" size={16} color="#0F0F70" />
          {feedback.num_comments}
        </IconWrapper>
      </Other>
    </Feedback>
  );
}

const Feedback = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 160px;
  padding: 12px 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background100};
`;

const ChipWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Title = styled.div`
  align-self: flex-start;
  margin: 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground700};
`;

const Content = styled.div`
  align-self: flex-start;
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.foreground500};

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
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
