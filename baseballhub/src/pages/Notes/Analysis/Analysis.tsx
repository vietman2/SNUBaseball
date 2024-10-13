import { useEffect, useState } from "react";
import styled from "styled-components";

import { sampleAnalyses } from "@data/notes";
import { AnalysisSimple } from "@fragments/Analysis";
import { AnalysisSimpleType } from "@models/notes";

export function Analysis() {
  const [analyses, setAnalyses] = useState<AnalysisSimpleType[]>([]);

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
          <AnalysisSimple key={analysis.id} analysis={analysis} />
        ))}
      </ContentWrapper>
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
  gap: 8px;
`;
