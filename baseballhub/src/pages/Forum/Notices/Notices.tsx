import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { MobileModal, SimpleModal } from "@components/Modals";
import { Subtitle } from "@components/Texts";
import { sampleNotices } from "@data/forum";
import {
  NoticeDetail,
  NoticeSimple,
  NoticeSimpleWide,
  NoticeSimpleWideHeader,
} from "@fragments/Notices";
import { useWindowSize } from "@hooks/useWindowSize";
import { NoticeSimpleType } from "@models/forum";

export function Notices() {
  const [notices, setNotices] = useState<NoticeSimpleType[]>([]);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { width } = useWindowSize();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleNoticeClick = (notice: NoticeSimpleType) => {
    setSelectedNoticeId(notice.id);
    openModal();
  };

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
            <button
              key={notice.id}
              onClick={() => handleNoticeClick(notice)}
              data-testid={`notice-${notice.id}`}
            >
              <NoticeSimpleWide notice={notice} />
            </button>
          ))}
          <SimpleModal isOpen={modalOpen} onClose={closeModal}>
            <NoticeDetail noticeId={selectedNoticeId} goBack={closeModal} />
          </SimpleModal>
        </>
      ) : (
        <>
          <Divider bold />
          {notices.map((notice) => (
            <button
              key={notice.id}
              onClick={() => handleNoticeClick(notice)}
              data-testid={`notice-${notice.id}`}
            >
              <NoticeSimple key={notice.id} notice={notice} />
            </button>
          ))}
          <MobileModal isOpen={modalOpen} onClose={closeModal}>
            <NoticeDetail noticeId={selectedNoticeId} goBack={closeModal} />
          </MobileModal>
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
