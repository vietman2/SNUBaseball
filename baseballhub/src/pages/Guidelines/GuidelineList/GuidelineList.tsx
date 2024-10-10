import { useEffect, useState } from "react";
import styled from "styled-components";

import { ChipTabs } from "@components/Tabs";
import { sampleGuidelines } from "@data/guidelines";
import { GuidelinePreview } from "@fragments/Guideline";
import { useWindowSize } from "@hooks/useWindowSize";
import { GuidelineSimpleType } from "@models/guidelines";

interface Props {
  selectedCategory: string;
  onSelectGuideline: (guideline: GuidelineSimpleType) => void;
}

export function GuidelineList({ selectedCategory, onSelectGuideline }: Readonly<Props>) {
  const [actions, setActions] = useState<string[]>([]);
  const [selectedAction, setSelectedAction] = useState<string>("");

  const [guidelines, setGuidelines] = useState<GuidelineSimpleType[]>([]);

  const { width } = useWindowSize();

  const handleGuidelineClick = (guideline: GuidelineSimpleType) => {
    onSelectGuideline(guideline);
  };

  useEffect(() => {
    // TODO: Fetch actions based on selected category
    setActions(["캐칭/핸들링", "스텝", "송구", "팝플라이"]);
    setSelectedAction("캐칭/핸들링");
  }, [selectedCategory]);

  useEffect(() => {
    // TODO: Fetch guidelines based on selected category
    setGuidelines(sampleGuidelines);
  }, [selectedAction]);

  return (
    <Container>
      <TabsWrapper>
        <ChipTabs
          options={actions}
          selected={selectedAction}
          onSelect={setSelectedAction}
        />
      </TabsWrapper>
      <Wrapper align={width > 768 ? "flex-start" : "center"}>
        {guidelines.map((guideline) => (
          <button
            key={guideline.id}
            onClick={() => handleGuidelineClick(guideline)}
            data-testid={`guideline-${guideline.id}`}
          >
            <GuidelinePreview guideline={guideline} />
          </button>
        ))}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;
  gap: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const TabsWrapper = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const Wrapper = styled.div<{ align: string }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: ${({ align }) => align};
  gap: 16px;
`;
