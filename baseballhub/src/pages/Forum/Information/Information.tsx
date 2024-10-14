import { useEffect, useState } from "react";
import styled from "styled-components";

import { MobileModal, SimpleModal } from "@components/Modals";
import { sampleInformations } from "@data/forum";
import { InformationDetail, InformationSimple } from "@fragments/Information";
import { useWindowSize } from "@hooks/useWindowSize";
import { InformationSimpleType } from "@models/forum";

export function Information() {
  const [informations, setInformations] = useState<InformationSimpleType[]>([]);
  const [selectedInformationId, setSelectedInformationId] = useState<
    number | null
  >(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { width } = useWindowSize();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInformationClick = (information: InformationSimpleType) => {
    setSelectedInformationId(information.id);
    openModal();
  };

  useEffect(() => {
    // TODO: Fetch information data from the server
    setInformations(sampleInformations);
  }, []);

  return (
    <Container>
      <Content>
        {informations.map((information) => (
          <button
            key={information.id}
            onClick={() => handleInformationClick(information)}
            data-testid={`information-${information.id}`}
          >
            <InformationSimple information={information} />
          </button>
        ))}
      </Content>
      {width > 768 ? (
        <SimpleModal isOpen={modalOpen} onClose={closeModal}>
          <InformationDetail
            informationId={selectedInformationId}
            goBack={closeModal}
          />
        </SimpleModal>
      ) : (
        <MobileModal isOpen={modalOpen} onClose={closeModal}>
          <InformationDetail
            informationId={selectedInformationId}
            goBack={closeModal}
          />
        </MobileModal>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 16px 8px 28px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;
