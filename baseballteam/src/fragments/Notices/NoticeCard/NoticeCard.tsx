import styled from "styled-components";

import { Chip } from "@components/Chips";
import { AppIcon } from "@components/Icons";
import { NoticeSimpleType } from "@models/forum";

interface Props {
  notice: NoticeSimpleType;
}

export function NoticeCard({ notice }: Readonly<Props>) {
  return (
    <Container>
      <div>
        <Chip
          label={notice.category.label}
          color={notice.category.color}
          bgColor={notice.category.background_color}
        />
        <div>{notice.created_at}</div>
      </div>
      <div>
        <div>{notice.title}</div>
        {notice.has_attachment && (
          <AppIcon icon="attachment" size={16} color="gray" />
        )}
      </div>
      <div>
        <div>{notice.author}</div>
        <div>
          <Numbers>
            <AppIcon icon="eye" size={16} color="gray" />
            {notice.num_views}
          </Numbers>
          <Numbers>
            <AppIcon icon="chat" size={16} color="gray" />
            {notice.num_comments}
          </Numbers>
          <Numbers>
            <AppIcon icon="heart-outline" size={16} color="gray" />
            {notice.num_likes}
          </Numbers>
        </div>
      </div>
      <div></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 8px 16px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground500};

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  > div:nth-child(1) {
    justify-content: space-between;
  }

  > div:nth-child(2) {
    padding: 8px 0;
    gap: 8px;

    font-size: 18px;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  > div:nth-child(3) {
    justify-content: space-between;
    gap: 16px;

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }
  }

  @media (max-width: 768px) {
    width: 85vw;
  }
`;

const Numbers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
