import { useEffect, useState } from "react";
import styled from "styled-components";

import { MobileModal, SimpleModal } from "@components/Modals";
import { sampleAnalyses } from "@data/notes";
import { AnalysisDetail, AnalysisSimple } from "@fragments/Analysis";
import { useWindowSize } from "@hooks/useWindowSize";
import { AnalysisSimpleType } from "@models/notes";

export function Analysis() {
  const [analyses, setAnalyses] = useState<AnalysisSimpleType[]>([]);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<number | null>(
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

  const handleAnalysisClick = (analysis: AnalysisSimpleType) => {
    setSelectedAnalysisId(analysis.id);
    openModal();
  };

  useEffect(() => {
    setAnalyses(sampleAnalyses);
  }, []);

  return (
    <Container>
      <FilterWrapper>
        <div>년도 필터</div>
      </FilterWrapper>
      <ContentWrapper>
        {analyses.map((analysis) => (
          <button
            key={analysis.id}
            onClick={() => handleAnalysisClick(analysis)}
            data-testid={`analysis-${analysis.id}`}
          >
            <AnalysisSimple analysis={analysis} />
          </button>
        ))}
      </ContentWrapper>
      {width > 768 ? (
        <SimpleModal isOpen={modalOpen} onClose={closeModal}>
          <AnalysisDetail analysisId={selectedAnalysisId} goBack={closeModal} />
        </SimpleModal>
      ) : (
        <MobileModal isOpen={modalOpen} onClose={closeModal}>
          <AnalysisDetail analysisId={selectedAnalysisId} goBack={closeModal} />
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

const FilterWrapper = styled.div`
  display: flex;
  padding: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;
