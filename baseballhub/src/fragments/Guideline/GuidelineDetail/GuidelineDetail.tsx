import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider } from "@components/Dividers";
import { ErrorComponent } from "@components/Fallbacks";
import { IFrame } from "@components/Frames";
import { Subtitle } from "@components/Texts";
import { sampleGuidelineDetail } from "@data/guidelines";
import { useWindowSize } from "@hooks/useWindowSize";
import { GuidelineDetailType } from "@models/guidelines";

interface Props {
  guidelineId: number | null;
  goBack: () => void;
}

export function GuidelineDetail({ guidelineId, goBack }: Readonly<Props>) {
  const [guideline, setGuideline] = useState<GuidelineDetailType | null>(null);

  const { width } = useWindowSize();

  useEffect(() => {
    // TODO: fetch guideline by guidelineId
    setGuideline(sampleGuidelineDetail);
  }, [guidelineId]);

  if (guidelineId === null || guideline === null)
    return <ErrorComponent onRefresh={goBack} label="뒤로가기" />;

  return (
    <Container>
      <Header onClick={goBack}>
        <ChipWrapper>
          {guideline.is_drill ? (
            <Chip label="드릴" bgColor="#E8F2F2" color="#50C878" />
          ) : (
            <Chip label="예시" bgColor="#E8E6F2" color="#0F0F70" />
          )}
        </ChipWrapper>
        <Subtitle size="large">{guideline.title}</Subtitle>
        <Metadata>
          <div>{guideline.shared_by}</div>
          <div>{guideline.shared_at}</div>
        </Metadata>
      </Header>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Description>
        <IFrame
          videoId={guideline.video_id}
          width={width > 768 ? "480px" : "320px"}
          height={width > 768 ? "270px" : "180px"}
        />
      </Description>
      <DividerWrapper>
        <Divider bold />
      </DividerWrapper>
      <Comments>
        {guideline.comments.map((comment) => (
          <div key={comment.id}>
            {comment.commented_by}: {comment.comment}
          </div>
        ))}
      </Comments>
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

const ChipWrapper = styled.div`
  display: flex;
  padding: 8px 12px;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding: 8px 16px;
  gap: 8px;
`;

const Description = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 300px;
  padding: 16px 8px;
`;

const Comments = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px 8px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground500};
`;

const DividerWrapper = styled.div`
  display: flex;
`;
