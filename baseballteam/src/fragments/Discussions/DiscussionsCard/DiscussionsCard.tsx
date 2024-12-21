import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { DiscussionSimpleType } from "@models/forum";

interface Props {
  discussion: DiscussionSimpleType;
}

export function DiscussionCard({ discussion }: Readonly<Props>) {
  return (
    <Container>
      <div>
        <TitleWrapper>
          <Title>{discussion.title}</Title>
          {discussion.has_attachment && (
            <AppIcon icon="attachment" size={16} color="gray" />
          )}
        </TitleWrapper>
        <div>{discussion.created_at}</div>
      </div>
      <div>
        <div>{discussion.author}</div>
        <div>
          <Numbers>
            <AppIcon icon="eye" size={16} color="gray" />
            {discussion.num_views}
          </Numbers>
          <Numbers>
            <AppIcon icon="chat" size={16} color="gray" />
            {discussion.num_comments}
          </Numbers>
          <Numbers>
            <AppIcon icon="heart-outline" size={16} color="gray" />
            {discussion.num_likes}
          </Numbers>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 12px 16px;
  gap: 32px;

  color: ${({ theme }) => theme.colors.foreground500};

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};

  > div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const Numbers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
