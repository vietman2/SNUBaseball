import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider } from "@components/Dividers";
import { ErrorComponent } from "@components/Fallbacks";
import { Subtitle } from "@components/Texts";
import { sampleNoticeDetail } from "@data/forum";
import { NoticeDetailType } from "@models/forum";

interface Props {
  noticeId: number | null;
  goBack: () => void;
}

export function NoticeDetail({ noticeId, goBack }: Readonly<Props>) {
  const [notice, setNotice] = useState<NoticeDetailType>();

  useEffect(() => {
    // TODO: Fetch notice data from the server
    setNotice(sampleNoticeDetail);
  }, []);

  if (noticeId === null || notice === undefined)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <ChipWrapper>
          <Chip
            label={notice.category.name}
            color={notice.category.color}
            bgColor={notice.category.bgColor}
          />
        </ChipWrapper>
        <Subtitle size="large">{notice.title}</Subtitle>
        <Metadata>
          <div>{notice.author}</div>
          <div>{notice.created_at}</div>
        </Metadata>
      </Header>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Content>
        <div>{notice.content}</div>
      </Content>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Comments>
        {notice.comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </Comments>
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
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding: 8px 16px;
  gap: 8px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 300px;
  padding: 16px 8px;

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
