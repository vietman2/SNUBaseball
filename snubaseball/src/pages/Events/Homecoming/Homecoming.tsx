import { useEffect, useState } from "react";
import styled from "styled-components";

import { Subtitle } from "@components/Texts";
import { sampleResults } from "@data/events";
import { Results } from "@fragments/Homecoming";
import { HomecomingResultType } from "@models/events";

export function Homecoming() {
  const [results, setResults] = useState<HomecomingResultType[]>([]);

  useEffect(() => {
    // Fetch homecoming results from the database
    setResults(sampleResults); // Placeholder data
  }, []);

  return (
    <Container>
      <Subtitle>
        OB전
        <span>_야구부의 과거와 현재</span>
      </Subtitle>
      <p>
        OB전은 야구부를 졸업한 선배님들이 오시는 행사입니다. 선배님들과의
        정기적인 만남을 통해 후배들은 선배님들께 감사의 인사를, 선배님들은
        후배들에게 아낌없는 조언과 격려를 전하며 하나된 야구부를 만들어갑니다.
      </p>
      {results.length > 0 && (
        <>
          {results.map((result) => (
            <Results key={result.id} results={result} />
          ))}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
