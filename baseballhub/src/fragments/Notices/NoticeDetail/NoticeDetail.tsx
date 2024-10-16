import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { Subtitle } from "@components/Texts";
import { NoticeDetailType } from "@models/forum";
import { getNoticeDetails } from "@services/board";

interface Props {
  noticeId: number | null;
  goBack: () => void;
}

export function NoticeDetail({ noticeId, goBack }: Readonly<Props>) {
  const [notice, setNotice] = useState<NoticeDetailType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchNoticeDetails = async () => {
      if (noticeId === null) return;

      setLoading(true);
      const response = await getNoticeDetails(noticeId);

      if (response) {
        setNotice(response.data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchNoticeDetails();
  }, [noticeId]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (noticeId === null || notice === undefined || error) {
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;
  }

  return (
    <Container>
      <Header>
        <ChipWrapper>
          <Chip
            label={notice.category.label}
            color={notice.category.color}
            bgColor={notice.category.background_color}
          />
        </ChipWrapper>
        <Subtitle size="large">{notice.title}</Subtitle>
        <Metadata>
          <div>{notice.author.name}</div>
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
