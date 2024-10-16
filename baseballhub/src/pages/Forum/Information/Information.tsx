import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { MobileModal, SimpleModal } from "@components/Modals";
import {
  InformationDetail,
  InformationSimple,
  InformationSimpleWide,
  InformationSimpleWideHeader,
} from "@fragments/Information";
import { useWindowSize } from "@hooks/useWindowSize";
import { InformationSimpleType } from "@models/forum";
import { getInformations } from "@services/board";

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
    setSelectedInformationId(null);
  };

  const handleInformationClick = (information: InformationSimpleType) => {
    setSelectedInformationId(information.id);
    openModal();
  };

  useEffect(() => {
    const fetchInformations = async () => {
      const response = await getInformations();

      if (response) {
        setInformations(response.data);
      }
    };

    fetchInformations();
  }, []);

  return (
    <Container>
      {width > 768 ? (
        <>
          <InformationSimpleWideHeader />
          {informations.map((information) => (
            <button
              key={information.id}
              onClick={() => handleInformationClick(information)}
              data-testid={`information-${information.id}`}
            >
              <InformationSimpleWide information={information} />
            </button>
          ))}
          <SimpleModal isOpen={modalOpen} onClose={closeModal}>
            <InformationDetail
              informationId={selectedInformationId}
              goBack={closeModal}
            />
          </SimpleModal>
        </>
      ) : (
        <>
          <Divider bold />
          {informations.map((information) => (
            <button
              key={information.id}
              onClick={() => handleInformationClick(information)}
              data-testid={`information-${information.id}`}
            >
              <InformationSimple information={information} />
            </button>
          ))}
          <MobileModal isOpen={modalOpen} onClose={closeModal}>
            <InformationDetail
              informationId={selectedInformationId}
              goBack={closeModal}
            />
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
