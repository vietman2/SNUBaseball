import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ErrorComponent, Loading } from "@components/Fallbacks";
import { Searchbar } from "@components/Searchbar";
import { MinutesSimple } from "@fragments/Minutes";
import { MinutesType } from "@models/team";
import { getMinutes } from "@services/team";

export function MinutesList() {
  const [minutes, setMinutes] = useState<MinutesType[]>([]);
  const [query, setQuery] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handleMinutesClick = (minutes: MinutesType) => {
    navigate(`/team/minutes/${minutes.id}`);
  };

  const handleWriteClick = () => {
    navigate("/team/minutes/new");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMinutes(query);

      if (response) {
        setMinutes(response);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    if (location.pathname === "/team/minutes") {
      fetchData();
    }
  }, [refreshCount, location.pathname, query]);

  return (
    <Container>
      <Subtitle>회의록</Subtitle>
      <Filters>
        <Searchbar query={query} setQuery={setQuery} />
        <NewButton onClick={handleWriteClick}>새 회의록</NewButton>
      </Filters>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorComponent label="새로고침" onRefresh={handleRefresh} />
      ) : (
        <List>
          {minutes.map((minutes, index) => (
            <button
              key={index}
              onClick={() => handleMinutesClick(minutes)}
              data-testid={`minutes-${minutes.id}`}
            >
              <MinutesSimple minutes={minutes} />
            </button>
          ))}
        </List>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0;
  gap: 16px;
`;

const Subtitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 0 16px;

  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground900};

  @media (max-width: 768px) {
    display: none;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
`;

const NewButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.background100};
  font-size: 1rem;
  font-weight: 400;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 16px;
  gap: 8px;
`;
