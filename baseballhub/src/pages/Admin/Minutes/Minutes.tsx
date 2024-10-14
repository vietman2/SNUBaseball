import { useEffect, useState } from "react";
import styled from "styled-components";

import { MobileModal, SimpleModal } from "@components/Modals";
import { sampleMinutes } from "@data/admin";
import { MinutesDetail, MinutesSimple } from "@fragments/Minutes";
import { useWindowSize } from "@hooks/useWindowSize";
import { MinutesSimpleType } from "@models/admin";

export function Minutes() {
  const [minutesList, setMinutesList] = useState<MinutesSimpleType[]>([]);
  const [selectedMinutesId, setSelectedMinutesId] = useState<number | null>(
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

  const handleMinutesClick = (minutes: MinutesSimpleType) => {
    setSelectedMinutesId(minutes.id);
    openModal();
  };

  useEffect(() => {
    setMinutesList(sampleMinutes);
  }, []);

  return (
    <Container>
      <ContentWrapper>
        {minutesList.map((minutes) => (
          <button
            key={minutes.id}
            onClick={() => handleMinutesClick(minutes)}
            data-testid={`minutes-${minutes.id}`}
          >
            <MinutesSimple minutes={minutes} />
          </button>
        ))}
      </ContentWrapper>
      {width > 768 ? (
        <SimpleModal isOpen={modalOpen} onClose={closeModal}>
          <MinutesDetail minutesId={selectedMinutesId} goBack={closeModal} />
        </SimpleModal>
      ) : (
        <MobileModal isOpen={modalOpen} onClose={closeModal}>
          <MinutesDetail minutesId={selectedMinutesId} goBack={closeModal} />
        </MobileModal>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;
  gap: 8px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;
