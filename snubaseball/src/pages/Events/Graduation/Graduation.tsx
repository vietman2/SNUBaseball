import { useEffect, useState } from "react";
import styled from "styled-components";

import { Subtitle } from "@components/Texts";
import { sampleGraduatesGroup } from "@data/events";
import { GraduatesGroup } from "@fragments/Graduates";
import { GraduatesGroupType } from "@models/events";

export function Graduation() {
  const [yearlyGraduates, setYearlyGraduates] = useState<GraduatesGroupType[]>(
    []
  );

  useEffect(() => {
    // Fetch graduates data from the server
    // and set the data to the state
    setYearlyGraduates([sampleGraduatesGroup]);
  }, []);

  return (
    <Container>
      <Subtitle>
        졸업식
        <span>_새로운 시작</span>
      </Subtitle>
      <p>
        졸업식은 야구부에 몸담았던 부원들의 졸업을 축하하는 자리입니다. 오랜
        시간 야구부를 위해 노력했던 부원들의 명예로운 마무리를 함께하며,
        앞으로의 여정을 향한 새로운 시작을 응원합니다.
      </p>
      {yearlyGraduates.map((graduatesGroup) => (
        <GraduatesGroup
          key={graduatesGroup.year}
          graduatesGroup={graduatesGroup}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
