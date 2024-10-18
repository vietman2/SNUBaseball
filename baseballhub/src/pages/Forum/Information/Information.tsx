import { useEffect, useState } from "react";
import styled from "styled-components";

import { Divider } from "@components/Dividers";
import { ErrorComponent, Loading } from "@components/Fallbacks";
import { MobileModal, SimpleModal } from "@components/Modals";
import { Subtitle } from "@components/Texts";
import { useAuth } from "@contexts/auth";
import {
  InformationDetail,
  InformationSimple,
  InformationSimpleWide,
  InformationSimpleWideHeader,
  InformationWrite,
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
    setSelectedInformationId(null);
    handleRefresh();
  };

  const handleEdit = () => {
    setEditMode(true);
    setWriteMode(true);
    openModal();
  };

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleInformationClick = (information: InformationSimpleType) => {
    setWriteMode(false);
    setSelectedInformationId(information.id);
    openModal();
  };

  const handleWriteClick = () => {
    setEditMode(false);
    setWriteMode(true);
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
      <Header>
        <Subtitle size="large">정보</Subtitle>
        {user?.is_admin && (
          <Button onClick={handleWriteClick}>새 글 등록</Button>
        )}
      </Header>
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
            {writeMode ? (
              <InformationWrite
                informationId={selectedInformationId}
                editMode={editMode}
                goBack={closeModal}
              />
            ) : (
              <InformationDetail
                informationId={selectedInformationId}
                goBack={closeModal}
                handleEdit={handleEdit}
              />
            )}
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
            {writeMode ? (
              <InformationWrite
                informationId={selectedInformationId}
                editMode={editMode}
                goBack={closeModal}
              />
            ) : (
              <InformationDetail
                informationId={selectedInformationId}
                goBack={closeModal}
                handleEdit={handleEdit}
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
