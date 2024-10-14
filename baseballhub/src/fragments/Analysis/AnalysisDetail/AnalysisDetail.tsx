import { useEffect, useState } from "react";
import styled from "styled-components";

import { ErrorComponent } from "@components/Fallbacks";
import { Subtitle } from "@components/Texts";
import { sampleAnalysisDetail } from "@data/notes";
import { AnalysisDetailType } from "@models/notes";

interface Props {
  analysisId: number | null;
  goBack: () => void;
}

export function AnalysisDetail({ analysisId, goBack }: Readonly<Props>) {
  const [analysis, setAnalysis] = useState<AnalysisDetailType>();

  useEffect(() => {
    setAnalysis(sampleAnalysisDetail);
  }, []);

  if (analysisId === null || analysis === undefined)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header>
        <Subtitle size="large">{analysis.title}</Subtitle>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;

  color: ${({ theme }) => theme.colors.foreground500};
  font-weight: 700;
`;
