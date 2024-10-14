import { useEffect, useState } from "react";
import styled from "styled-components";

import { MobileModal, SimpleModal } from "@components/Modals";
import { ChipTabs } from "@components/Tabs";
import { sampleGuidelines } from "@data/guidelines";
import { GuidelineDetail, GuidelineSimple } from "@fragments/Guideline";
import { useWindowSize } from "@hooks/useWindowSize";
import { GuidelineSimpleType } from "@models/guidelines";

interface Props {
  selectedCategory: string;
}

export function Guidelines({ selectedCategory }: Readonly<Props>) {
  const [actions, setActions] = useState<string[]>([]);
  const [selectedAction, setSelectedAction] = useState<string>("");

  const [guidelines, setGuidelines] = useState<GuidelineSimpleType[]>([]);
  const [selectedGuidelineId, setSelectedGuidelineId] = useState<number | null>(
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

  const handleGuidelineClick = (guideline: GuidelineSimpleType) => {
    setSelectedGuidelineId(guideline.id);
    openModal();
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
            <GuidelineSimple guideline={guideline} />
          </button>
        ))}
      </Wrapper>
      {width > 768 ? (
        <SimpleModal isOpen={modalOpen} onClose={closeModal}>
          <GuidelineDetail
            guidelineId={selectedGuidelineId}
            goBack={closeModal}
          />
        </SimpleModal>
      ) : (
        <MobileModal isOpen={modalOpen} onClose={closeModal}>
          <GuidelineDetail
            guidelineId={selectedGuidelineId}
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
