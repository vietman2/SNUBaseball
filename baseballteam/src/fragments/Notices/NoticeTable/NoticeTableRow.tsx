import styled from "styled-components";

import { Chip } from "@components/Chips";
import { AppIcon } from "@components/Icons";
import { NoticeSimpleType } from "@models/forum";

export function NoticeTableHeader() {
  return (
    <Header>
      <div />
      <div>
        <AppIcon icon="text" size={18} color="#212529" />
        제목
      </div>
      <div>
        <AppIcon icon="category" size={18} color="#212529" />
        카테고리
      </div>
      <div>
        <AppIcon icon="person" size={18} color="#212529" />
        작성자
      </div>
      <div>
        <AppIcon icon="calendar" size={18} color="#212529" />
        작성일
      </div>
      <div>
        <AppIcon icon="heart-outline" size={18} color="#212529" />
        좋아요
      </div>
      <div>
        <AppIcon icon="chat" size={20} color="#212529" />
        댓글
      </div>
      <div>
        <AppIcon icon="eye" size={20} color="#212529" />
        조회수
      </div>
    </Header>
  );
}

interface RowProps {
  notice: NoticeSimpleType;
}

export function NoticeTableRow({
  notice,
}: Readonly<RowProps>) {
  return (
    <Container>
      <div>{notice.id}</div>
      <div>
        {notice.title}
        {notice.has_attachment && (
          <AppIcon icon="attachment" size={16} color="gray" />
        )}
      </div>
      <div>
        <Chip
          label={notice.category.label}
          color={notice.category.color}
          bgColor={notice.category.background_color}
        />
      </div>
      <div>{notice.author}</div>
      <div>{notice.created_at}</div>
      <div>{notice.num_likes}</div>
      <div>{notice.num_comments}</div>
      <div>{notice.num_views}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 16px;
  color: ${({ theme }) => theme.colors.foreground700};

  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding: 8px;
    gap: 6px;

    white-space: nowrap;

    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  }

  > div:nth-child(1) {
    width: 40px;
  }

  > div:nth-child(2) {
    flex: 1;
    justify-content: flex-start;
    min-width: 80px;
    max-width: 480px;

    white-space: nowrap;
    overflow: hidden;
  }
`;

const Header = styled(Container)`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.foreground500};

  border-top: none;

  > div {
    justify-content: center !important;
    height: 32px;
  }
`;
