import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { Subtitle } from "@components/Texts";
import { sampleNotices } from "@data/forum";
import {
  NoticeSimple,
  NoticeSimpleWide,
  NoticeSimpleWideHeader,
} from "@fragments/Notices";
import { useWindowSize } from "@hooks/useWindowSize";
import { NoticeSimpleType } from "@models/forum";

export function Notices() {
  const [notices, setNotices] = useState<NoticeSimpleType[]>([]);

  const { width } = useWindowSize();

  useEffect(() => {
    // TODO: Fetch notice data from the server
    setNotices(sampleNotices);
  }, []);

  return (
    <Container>
      <Subtitle size="large">공지사항</Subtitle>
      {width > 768 ? (
        <>
          <NoticeSimpleWideHeader />
          {notices.map((notice) => (
            <NoticeSimpleWide key={notice.id} notice={notice} />
          ))}
        </>
      ) : (
        <>
          <Divider bold />
          {notices.map((notice) => (
            <NoticeSimple key={notice.id} notice={notice} />
          ))}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;
