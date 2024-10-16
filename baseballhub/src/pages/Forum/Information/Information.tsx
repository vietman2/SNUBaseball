import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const { width } = useWindowSize();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedInformationId(null);
  };

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleInformationClick = (information: InformationSimpleType) => {
    setSelectedInformationId(information.id);
    openModal();
  };

  useEffect(() => {
    const fetchInformations = async () => {
      setLoading(true);
      const response = await getInformations();

      if (response) {
        setInformations(response.data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchInformations();
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
