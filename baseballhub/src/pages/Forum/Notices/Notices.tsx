import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { MobileModal, SimpleModal } from "@components/Modals";
import { Subtitle } from "@components/Texts";
import {
  NoticeDetail,
  NoticeSimple,
  NoticeSimpleWide,
  NoticeSimpleWideHeader,
} from "@fragments/Notices";
import { useWindowSize } from "@hooks/useWindowSize";
import { NoticeSimpleType } from "@models/forum";
import { getNotices } from "@services/board";

export function Notices() {
  const [notices, setNotices] = useState<NoticeSimpleType[]>([]);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const { width } = useWindowSize();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNoticeId(null);
  };

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleNoticeClick = (notice: NoticeSimpleType) => {
    setSelectedNoticeId(notice.id);
    openModal();
  };

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      const response = await getNotices();

      if (response) {
        setNotices(response.data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchNotices();
  }, [refreshCount]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorComponent label="새로고침" onRefresh={handleRefresh} />
      </Container>
    );
  }

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
