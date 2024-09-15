import styled from "styled-components";

import { IFrame } from "@components/Frames";
import { GameResultsType } from "@models/records/game";

interface Props {
  game: GameResultsType;
}

export function Scoreboard({ game }: Readonly<Props>) {
  return (
    <Container>
      <Table>
        <thead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>1</TableCell>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
            <TableCell>4</TableCell>
            <TableCell>5</TableCell>
            <TableCell>6</TableCell>
            <TableCell>7</TableCell>
            <TableCell>8</TableCell>
            <TableCell>9</TableCell>
            <TableCell>R</TableCell>
            <TableCell>H</TableCell>
            <TableCell>E</TableCell>
            <TableCell>B</TableCell>
          </TableRow>
        </thead>
        <tbody>
          <TableRow>
            <TableCell>{game.home_team}</TableCell>
            {game.home_runs.map((run, index) => (
              <TableCell key={index}>{run === -1 ? "-" : run}</TableCell>
            ))}
            {game.home_records.map((record, index) => (
              <TableCell key={index}>{record}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>{game.away_team}</TableCell>
            {game.away_runs.map((run, index) => (
              <TableCell key={index}>{run === -1 ? "-" : run}</TableCell>
            ))}
            {game.away_records.map((record, index) => (
              <TableCell key={index}>{record}</TableCell>
            ))}
          </TableRow>
        </tbody>
      </Table>
      <div>
        <IFrame videoId="U28Gz6Dev0w" width="80%" height="400" />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
  border-radius: 10px;
  background-color: white;

  div {
    display: flex;
    width: 100%;
    margin-top: 0.5rem;
    justify-content: center;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableRow = styled.tr`
  padding: 0.25rem 1rem;
  border: 1px solid #d5d5d5;
`;

const TableCell = styled.td`
  padding: 0.25rem 1rem;
  border: 1px solid #d5d5d5;
`;
