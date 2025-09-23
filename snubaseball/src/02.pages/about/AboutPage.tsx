import { Metadata } from "next";

import { Container, TimelineWrapper } from "./ui/styles";
import { MilestoneItem, timeline } from "@entities/history";

export const metadata: Metadata = {
  title: "팀 소개 - 서울대 야구부",
  description: "서울대 야구부에 대하여",
};

export function AboutPage() {
  return (
    <Container>
      <h3 className="about-page-subtitle">서울대 야구부에 대하여</h3>
      <p>
        대학야구 내에서 서울대학교는 “공부하는 야구선수” 의 기치를 드높이며 학생
        본연의 임무인 학업을 소홀히 하지 않으면서도 야구 선수로서의 자세와
        능력을 함양하기 위해 최선을 다하고 있다.
      </p>
      <h3 id="timeline" className="about-page-subtitle">
        연혁
      </h3>
      <TimelineWrapper>
        {timeline.map((milestone) => (
          <MilestoneItem key={milestone.year} milestone={milestone} />
        ))}
      </TimelineWrapper>
    </Container>
  );
}
