import styled from "styled-components";

import { AppIcon, MainLogo } from "@components/Icons";
import { GameResultsType } from "@models/records";

interface Props {
  game: GameResultsType;
}

export function Scoreboard({ game }: Readonly<Props>) {
  const isHome = game.home_team === "서울대";
  const opponent = isHome ? game.away_team : game.home_team;

  const getDateText = () => {
    const dateText = game.date
      .slice(5, 10)
      .replace(/^0+/, "")
      .replace("-", "/");
    return `${dateText}`;
  };

  return (
    <Container>
      <Header>
        {isHome ? (
          <Team>
            <AppIcon icon="baseball" size={40} color="white" />
            {opponent}
          </Team>
        ) : (
          <Team>
            <MainLogo size={40} />
            서울대
          </Team>
        )}
        <Middle>
          <Score>{game.away_records[0]}</Score>
          <Info>
            <div>
              {getDateText()}
              <br />
              {game.time}
              <br />
              {game.location}
            </div>
          </Info>
          <Score>{game.home_records[0]}</Score>
        </Middle>
        {isHome ? (
          <Team>
            <MainLogo size={40} />
            서울대
          </Team>
        ) : (
          <Team>
            <AppIcon icon="baseball" size={40} color="white" />
            {opponent}
          </Team>
        )}
      </Header>
      <Table>
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "7%" }} />
          <col style={{ width: "5.5%" }} />
          <col style={{ width: "5.5%" }} />
          <col style={{ width: "5.5%" }} />
          <col style={{ width: "5.5%" }} />
        </colgroup>
        <TableHead>
          <Row>
            <td>Team</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>R</td>
            <td>H</td>
            <td>E</td>
            <td>B</td>
          </Row>
        </TableHead>
        <TableBody>
          <Row>
            <td>{game.home_team}</td>
            {game.home_runs.map((run, index) => (
              <td key={index}>{run === -1 ? "-" : run}</td>
            ))}
            {game.home_records.map((record, index) => (
              <td key={index}>{record}</td>
            ))}
          </Row>
          <Row>
            <td>{game.away_team}</td>
            {game.away_runs.map((run, index) => (
              <td key={index}>{run === -1 ? "-" : run}</td>
            ))}
            {game.away_records.map((record, index) => (
              <td key={index}>{record}</td>
            ))}
          </Row>
        </TableBody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #28a745;
  border-radius: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const Team = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
  color: ${({ theme }) => theme.colors.foreground700};
`;

const Middle = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  gap: 24px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  div {
    text-align: center;
    font-size: 12px;
  }
`;

const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background100};
`;

const Table = styled.table`
  width: 95%;
  align-self: center;
  margin: 8px 0;
  border-collapse: collapse;

  font-size: 14px;
`;

const TableHead = styled.thead`
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  color: ${({ theme }) => theme.colors.background100};
`;

const TableBody = styled.tbody`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.foreground700};
`;

const Row = styled.tr`
  td {
    padding: 4px 0;
    text-align: center;
  }

  td:first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  }

  td:nth-child(11) {
    border-left: 1px solid ${({ theme }) => theme.colors.borderLight};
    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  }

  td:nth-child(12),
  td:nth-child(13),
  td:nth-child(14) {
    font-weight: normal;
  }
`;
