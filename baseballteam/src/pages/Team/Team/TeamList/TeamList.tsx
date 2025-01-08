import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { TeamTableHeader, TeamTableRow } from "@fragments/Team";
import { TeamInfoType } from "@models/team";
import { createTeam, getTeams } from "@services/team";

export function TeamList() {
  const [teams, setTeams] = useState<TeamInfoType[]>([]);
  const [year, setYear] = useState<number>(2025);
  const [professor, setProfessor] = useState<string>("");
  const [headCoach, setHeadCoach] = useState<string>("");
  const [headManager, setHeadManager] = useState<string>("");
  const [captain, setCaptain] = useState<string>("");
  const [viceCaptain, setViceCaptain] = useState<string>("");

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const navigate = useNavigate();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    handleRefresh();
  };

  const handleDetail = (year: number) => {
    navigate(`/team/info/${year}`);
  };

  const handleSubmit = async () => {
    const response = await createTeam(
      year.toString(),
      professor,
      headCoach,
      headManager,
      captain,
      viceCaptain
    );

    if (response) {
      handleCloseModal();
      setYear(2025);
      setProfessor("");
      setHeadCoach("");
      setHeadManager("");
      setCaptain("");
      setViceCaptain("");
    } else {
      window.alert("팀 추가에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeams();

      if (response) {
        setTeams(response);
      }
    };

    fetchData();
  }, [refreshCount]);

  return (
    <>
      <Container>
        <Header>
          <span>연도별 팀 정보</span>
          <Button onClick={handleOpenModal}>팀 추가</Button>
        </Header>
        <TeamTableHeader />
        {teams.map((team) => (
          <button
            key={team.year}
            onClick={() => handleDetail(team.year)}
            data-testid={`team-${team.year}`}
          >
            <TeamTableRow team={team} />
          </button>
        ))}
      </Container>
      {modalOpen && (
        <Overlay onClick={handleCloseModal} data-testid="modal-overlay">
          <Modal onClick={(e) => e.stopPropagation()}>
            <Title>팀 추가</Title>
            <Contents>
              <Wrapper>
                <span>연도</span>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  data-testid="year-input"
                />
              </Wrapper>
              <Wrapper>
                <span>지도교수</span>
                <input
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)}
                  data-testid="professor-input"
                />
              </Wrapper>
              <Wrapper>
                <span>감독</span>
                <input
                  value={headCoach}
                  onChange={(e) => setHeadCoach(e.target.value)}
                  data-testid="head-coach-input"
                />
              </Wrapper>
              <Wrapper>
                <span>수석매니저</span>
                <input
                  value={headManager}
                  onChange={(e) => setHeadManager(e.target.value)}
                  data-testid="head-manager-input"
                />
              </Wrapper>
              <Wrapper>
                <span>주장</span>
                <input
                  value={captain}
                  onChange={(e) => setCaptain(e.target.value)}
                  data-testid="captain-input"
                />
              </Wrapper>
              <Wrapper>
                <span>부주장</span>
                <input
                  value={viceCaptain}
                  onChange={(e) => setViceCaptain(e.target.value)}
                  data-testid="vice-captain-input"
                />
              </Wrapper>
            </Contents>
            <SubmitButton onClick={handleSubmit}>추가</SubmitButton>
          </Modal>
        </Overlay>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 24px;

  > span {
    font-size: 1.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.foreground900};

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.background100};
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 240px;
  height: 35%;
  transform: translate(-25%, -50%);
  padding: 16px;
  gap: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background100};

  > span:first-child {
    font-size: 1.25rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    transform: translate(-50%, -50%);
  }
`;

const Title = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  > input {
    height: 26px;
    width: 100px;
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
    color: ${({ theme }) => theme.colors.foreground900};
    background-color: ${({ theme }) => theme.colors.background300};

    @media (max-width: 768px) {
      width: 40vw;
    }
  }
`;

const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;

  color: ${({ theme }) => theme.colors.background100};
  font-size: 1rem;
  font-weight: 400;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
