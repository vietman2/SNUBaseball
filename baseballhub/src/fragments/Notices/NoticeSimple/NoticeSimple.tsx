import styled from "styled-components";

import { Chip } from "@components/Chips";
import { NoticeSimpleType } from "@models/forum";

interface Props {
  notice: NoticeSimpleType;
}

export function NoticeSimple({ notice }: Readonly<Props>) {
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
      <div>{notice.title}</div>
      <div>
        <div>{notice.author}</div>
        <div>{notice.num_views}</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 48px);
  padding: 8px 16px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground500};

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background100};

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 0;

    font-size: 18px;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  > div:nth-child(3) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
