import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { AppIcon } from "@components/Icons";
import { SimpleSelector } from "@components/Selectors";
import { useTheme } from "@contexts/theme";
import { sampleFeedbacks } from "@data/notes";
import { FeedbackType, FeedbackResponseType } from "@models/notes";

export function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponseType>();

  const { isDarkMode } = useTheme();

  useEffect(() => {
    setFeedbacks(sampleFeedbacks);
  }, []);

  return (
    <Container>
      <FilterWrapper>
        선수
        <SimpleSelector
          options={["전체", "양서진", "이유용"]}
          selected="전체"
          onSelect={() => {}}
        />
      </FilterWrapper>
      <ListWrapper>
        <TopRow>
          <Dot color="#FF453A" />
          <Subtitle>New</Subtitle>
          <Count>1</Count>
        </TopRow>
        <List>
          {feedbacks?.new.map((feedback) => (
            <FeedbackSimple key={feedback.id} feedback={feedback} />
          ))}
          <AddButton>
            <AppIcon
              icon="plus"
              size={14}
              color={isDarkMode ? "#B1BDCD" : "#212529"}
            />
            피드백 추가
          </AddButton>
        </List>
      </ListWrapper>
      <ListWrapper>
        <TopRow>
          <Dot color="#34C759" />
          <Subtitle>In Progress</Subtitle>
          <Count>1</Count>
        </TopRow>
        <List>
          {feedbacks?.in_progress.map((feedback) => (
            <FeedbackSimple key={feedback.id} feedback={feedback} />
          ))}
          <AddButton>
            <AppIcon
              icon="plus"
              size={14}
              color={isDarkMode ? "#B1BDCD" : "#212529"}
            />
            피드백 추가
          </AddButton>
        </List>
      </ListWrapper>
      <ListWrapper>
        <TopRow>
          <Dot color="#FFD60A" />
          <Subtitle>Under Review</Subtitle>
          <Count>1</Count>
        </TopRow>
        <List>
          {feedbacks?.under_review.map((feedback) => (
            <FeedbackSimple key={feedback.id} feedback={feedback} />
          ))}
          <AddButton>
            <AppIcon
              icon="plus"
              size={14}
              color={isDarkMode ? "#B1BDCD" : "#212529"}
            />
            피드백 추가
          </AddButton>
        </List>
      </ListWrapper>
      <ListWrapper>
        <TopRow>
          <Dot color="#007AFF" />
          <Subtitle>Done</Subtitle>
          <Count>1</Count>
        </TopRow>
        <List>
          {feedbacks?.done.map((feedback) => (
            <FeedbackSimple key={feedback.id} feedback={feedback} />
          ))}
          <AddButton>
            <AppIcon
              icon="plus"
              size={14}
              color={isDarkMode ? "#B1BDCD" : "#212529"}
            />
            피드백 추가
          </AddButton>
        </List>
      </ListWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 24px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};

  overflow-x: scroll;
  white-space: nowrap;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground700};
  font-size: 18px;
  font-weight: 700;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background700};
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground700};
`;

const Count = styled.div`
  margin-left: 4px;
  padding: 4px 8px;
  border-radius: 50%;

  font-size: 14px;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.foreground700};
  background-color: ${({ theme }) => theme.colors.background100};
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;

  overflow-y: auto;
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 160px;
  gap: 4px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background100};
  color: ${({ theme }) => theme.colors.foreground700};
  font-size: 14px;
  font-weight: 600;
`;

interface Props {
  feedback: FeedbackType;
}

function FeedbackSimple({ feedback }: Readonly<Props>) {
  return (
    <Feedback>
      <ChipWrapper>
        <Chip
          label={feedback.classification.type}
          bgColor={feedback.classification.backgroundColor}
          color={feedback.classification.color}
        />
      </ChipWrapper>
      <Title>{feedback.title}</Title>
      <Content>{feedback.content}</Content>
      <Other>
        {feedback.player}
        <IconWrapper>
          <AppIcon icon="chat" size={16} color="#0F0F70" />
          {1}
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
