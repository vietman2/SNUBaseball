import { useEffect, useState } from "react";
import styled from "styled-components";

import { MobileModal, SimpleModal } from "@components/Modals";
import { sampleHistory } from "@data/accountings";
import {
  HistoryDetail,
  HistorySimple,
  HistorySimpleHeader,
} from "@fragments/Accountings";
import { useWindowSize } from "@hooks/useWindowSize";
import { HistorySimpleType } from "@models/accountings";

export function History() {
  const [historyList, setHistoryList] = useState<HistorySimpleType[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<number | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { width } = useWindowSize();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleHistoryClick = (history: HistorySimpleType) => {
    setSelectedHistoryId(history.id);
    openModal();
  };

  useEffect(() => {
    setHistoryList(sampleHistory);
  }, []);

  return (
    <Container>
      <FiltersWrapper>
        <div>날짜 필터</div>
        <div>계좌별 필터</div>
        <div>유형 필터</div>
        <div>지출/수입 필터</div>
        <div>추가 버튼</div>
      </FiltersWrapper>
      <ContentWrapper>
        <HistorySimpleHeader />
        {historyList.map((history) => (
          <button
            key={history.id}
            onClick={() => handleHistoryClick(history)}
            data-testid={`history-${history.id}`}
          >
            <HistorySimple history={history} />
          </button>
        ))}
      </ContentWrapper>
      {width > 768 ? (
        <SimpleModal isOpen={modalOpen} onClose={closeModal}>
          <HistoryDetail historyId={selectedHistoryId} goBack={closeModal} />
        </SimpleModal>
      ) : (
        <MobileModal isOpen={modalOpen} onClose={closeModal}>
          <HistoryDetail historyId={selectedHistoryId} goBack={closeModal} />
        </MobileModal>
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

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
