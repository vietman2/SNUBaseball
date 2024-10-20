import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { Subtitle } from "@components/Texts";
import { FeedbackDetailType } from "@models/notes";
import { getFeedbackDetail } from "@services/notes";

interface Props {
  feedbackId: number | null;
  goBack: () => void;
}

export function FeedbackDetail({ feedbackId, goBack }: Readonly<Props>) {
  const [feedback, setFeedback] = useState<FeedbackDetailType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchFeedbackDetails = async () => {
      if (feedbackId === null) return;

      setLoading(true);
      const response = await getFeedbackDetail(feedbackId);

      if (response) {
        setFeedback(response.data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchFeedbackDetails();
  }, [feedbackId]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (feedbackId === null || feedback === undefined || error)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <ChipWrapper>
          <Chip
            label={feedback.category.label}
            color={feedback.category.color}
            bgColor={feedback.category.background_color}
          />
          <StatusChipWrapper
            style={{ backgroundColor: feedback.status.background_color }}
          >
            <Dot color={feedback.status.color} />
            {feedback.status.label}
          </StatusChipWrapper>
        </ChipWrapper>
        <Subtitle size="large">{feedback.title}</Subtitle>
        <Metadata>
          <div>
            <img src={feedback.player.profile_image} alt="profile" />
            <div>
              <Name>{feedback.player.name}</Name>
              <div>선수</div>
            </div>
          </div>
          <div>{feedback.created_at}</div>
        </Metadata>
        <DividerWrapper>
          <Divider bold />
        </DividerWrapper>
        <Content>
          <Coach>
            <img src={feedback.author.profile_image} alt="profile" />
            <div>
              <Name>{feedback.author.name}</Name>
              <div>코치</div>
            </div>
          </Coach>
          <div>{feedback.content}</div>
        </Content>
        <DividerWrapper>
          <Divider bold />
        </DividerWrapper>
        <Comments>
          <Subtitle>댓글 ({feedback.num_comments})</Subtitle>
          {feedback.comments.map((comment, index) => (
            <div key={index}>{comment}</div>
          ))}
        </Comments>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
`;

const ChipWrapper = styled.div`
  display: flex;
  padding: 8px 12px;
  gap: 8px;
`;

const Coach = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  > img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding: 8px 16px 16px 16px;
  gap: 8px;

  > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    > img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }
`;

const Name = styled.div`
  color: ${({ theme }) => theme.colors.foreground700};
  font-size: 18px;
  font-weight: 700;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 300px;
  padding: 16px 8px;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const Comments = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 8px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const DividerWrapper = styled.div`
  display: flex;
`;

const StatusChipWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 5px 10px;
  gap: 4px;

  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground700};

  border-radius: 5px;

  white-space: nowrap;
`;

const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;
