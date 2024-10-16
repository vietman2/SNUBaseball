import { useEffect, useState } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { MobileModal, SimpleModal } from "@components/Modals";
import { SimpleSelector } from "@components/Selectors";
import { useTheme } from "@contexts/theme";
import { FeedbackDetail, FeedbackSimple } from "@fragments/Feedback";
import { useWindowSize } from "@hooks/useWindowSize";
import { FeedbackSimpleType, FeedbackResponseType } from "@models/notes";
import { getFeedbacks } from "@services/notes";

export function Feedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponseType>();
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(
    null
  );

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const { isDarkMode } = useTheme();
  const { width } = useWindowSize();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFeedbackId(null);
  };

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleFeedbackClick = (feedback: FeedbackSimpleType) => {
    setSelectedFeedbackId(feedback.id);
    openModal();
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      const response = await getFeedbacks();

      if (response) {
        setFeedbacks(response.data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchFeedbacks();
  }, [refreshCount]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error || feedbacks === undefined) {
    return (
      <Container>
        <ErrorComponent label="새로고침" onRefresh={handleRefresh} />
      </Container>
    );
  }

  return (
    <Container>
      <Contents>
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
            {feedbacks.new.map((feedback) => (
              <button
                key={feedback.id}
                onClick={() => handleFeedbackClick(feedback)}
                data-testid={`feedback-${feedback.id}`}
              >
                <FeedbackSimple feedback={feedback} />
              </button>
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
            {feedbacks.in_progress.map((feedback) => (
              <button
                key={feedback.id}
                onClick={() => handleFeedbackClick(feedback)}
                data-testid={`feedback-${feedback.id}`}
              >
                <FeedbackSimple feedback={feedback} />
              </button>
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
            {feedbacks.under_review.map((feedback) => (
              <button
                key={feedback.id}
                onClick={() => handleFeedbackClick(feedback)}
                data-testid={`feedback-${feedback.id}`}
              >
                <FeedbackSimple key={feedback.id} feedback={feedback} />
              </button>
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
            {feedbacks.done.map((feedback) => (
              <button
                key={feedback.id}
                onClick={() => handleFeedbackClick(feedback)}
                data-testid={`feedback-${feedback.id}`}
              >
                <FeedbackSimple key={feedback.id} feedback={feedback} />
              </button>
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
      </Contents>
      {width > 768 ? (
        <SimpleModal isOpen={modalOpen} onClose={closeModal}>
          <FeedbackDetail feedbackId={selectedFeedbackId} goBack={closeModal} />
        </SimpleModal>
      ) : (
        <MobileModal isOpen={modalOpen} onClose={closeModal}>
          <FeedbackDetail feedbackId={selectedFeedbackId} goBack={closeModal} />
        </MobileModal>
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

const Contents = styled.div`
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
