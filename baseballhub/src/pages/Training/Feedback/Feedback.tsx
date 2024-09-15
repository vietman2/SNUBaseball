import { useEffect, useState } from "react";
import styled from "styled-components";

const samplePlayers = [
  "전체",
  "김유안",
  "양서진",
  "이상현",
  "유호성",
  "허준서",
  "김택원",
  "심민수",
  "이두희",
];

const tabs = ["내야 수비", "외야 수비", "타격", "스로잉", "주루"];

export default function Feedback() {
  const [semester, setSemester] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("내야 수비");

  useEffect(() => {
    setPlayers(samplePlayers);
    setSemester("2024-2학기");
    setSelectedPlayer("전체");
  }, []);

  return (
      <Container>
        <Title>{semester} Feedback</Title>
        <Contents>
        </Contents>
      </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Title = styled.h2`
  margin: 80px 0 0 0;
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
