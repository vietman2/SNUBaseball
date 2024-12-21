import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { DiscussionSimpleType } from "@models/forum";

export function DiscussionsTableHeader() {
  return (
    <Header>
      <div />
      <div>
        <AppIcon icon="text" size={18} color="#212529" />
        <span>제목</span>
      </div>
      <div>
        <AppIcon icon="people" size={18} color="#212529" />
        <span>작성자</span>
      </div>
      <div>
        <AppIcon icon="calendar" size={18} color="#212529" />
        <span>작성일</span>
      </div>
      <div>
        <AppIcon icon="heart-outline" size={18} color="#212529" />
        <span>좋아요</span>
      </div>
      <div>
        <AppIcon icon="chat" size={20} color="#212529" />
        <span>댓글</span>
      </div>
      <div>
        <AppIcon icon="eye" size={20} color="#212529" />
        <span>조회수</span>
      </div>
    </Header>
  );
}

interface RowProps {
  discussion: DiscussionSimpleType;
}

export function DiscussionsTableRow({
  discussion,
}: Readonly<RowProps>) {
  return (
    <Container>
      <div>{discussion.id}</div>
      <div>
        {discussion.title}
        {discussion.has_attachment && (
          <AppIcon icon="attachment" size={16} color="gray" />
        )}
      </div>
      <div>{discussion.author}</div>
      <div>{discussion.created_at}</div>
      <div>{discussion.num_likes}</div>
      <div>{discussion.num_comments}</div>
      <div>{discussion.num_views}</div>
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

    > span {
      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  > div:nth-child(1) {
    width: 60px;

    @media (max-width: 768px) {
      width: 40px;
    }
  }

  > div:nth-child(2) {
    flex: 1;
    justify-content: flex-start;
    min-width: 80px;
    max-width: 400px;

    white-space: nowrap;
    overflow: hidden;
  }

  > div:nth-child(5) {
    @media (max-width: 768px) {
      display: none;
    }
  }

  > div:nth-child(6) {
    @media (max-width: 768px) {
      display: none;
    }
  }

  > div:nth-child(7) {
    @media (max-width: 768px) {
      display: none;
    }
`;

const Header = styled(Container)`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.foreground500};

  border-top: none;

  > div {
    justify-content: center !important;
    height: 32px;
    border-right: none;
  }
`;
