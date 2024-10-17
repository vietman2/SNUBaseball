import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { MobileModal, SimpleModal } from "@components/Modals";
import { Subtitle } from "@components/Texts";
import { useAuth } from "@contexts/auth";
import {
  NoticeWrite,
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
  const [writeMode, setWriteMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const { user } = useAuth();
  const { width } = useWindowSize();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setWriteMode(false);
    setModalOpen(false);
    setSelectedNoticeId(null);
    handleRefresh();
  };

  const handleEdit = () => {
    setEditMode(true);
    setWriteMode(true);
    openModal();
  }

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleNoticeClick = (notice: NoticeSimpleType) => {
    setWriteMode(false);
    setSelectedNoticeId(notice.id);
    openModal();
  };

  const handleWriteClick = () => {
    setEditMode(false);
    setWriteMode(true);
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
      <Header>
        <Subtitle size="large">공지사항</Subtitle>
        {user?.is_admin && (
          <Button onClick={handleWriteClick}>새 공지 등록</Button>
        )}
      </Header>
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
            {writeMode ? (
              <NoticeWrite
                noticeId={selectedNoticeId}
                editMode={editMode}
                goBack={closeModal}
              />
            ) : (
              <NoticeDetail
                handleEdit={handleEdit}
                noticeId={selectedNoticeId}
                goBack={closeModal}
              />
            )}
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
            {writeMode ? (
              <NoticeWrite
                noticeId={selectedNoticeId}
                editMode={editMode}
                goBack={closeModal}
              />
            ) : (
              <NoticeDetail
                handleEdit={handleEdit}
                noticeId={selectedNoticeId}
                goBack={closeModal}
              />
            )}
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

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  gap: 16px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.background100};
  font-weight: 500;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
