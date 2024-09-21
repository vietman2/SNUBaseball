import styled from "styled-components";

import { GameResultsType } from "@models/records/game";
import { palette } from "@colors/palette";

interface Props {
  game: GameResultsType;
}

export function Scoreboard({ game }: Readonly<Props>) {
  return (
    <Table>
      <thead>
        <TableRow style={{ backgroundColor: palette.drawBackground }}>
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
          <TableCell
            style={{
              fontWeight: game.home_team === "서울대" ? "bold" : "normal",
            }}
          >
            {game.home_team}
          </TableCell>
          {game.home_runs.map((run, index) => (
            <TableCell key={index}>{run === -1 ? "-" : run}</TableCell>
          ))}
          {game.home_records.map((record, index) => (
            <TableCell key={index}>{record}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              fontWeight: game.away_team === "서울대" ? "bold" : "normal",
            }}
          >
            {game.away_team}
          </TableCell>
          {game.away_runs.map((run, index) => (
            <TableCell key={index}>{run === -1 ? "-" : run}</TableCell>
          ))}
          {game.away_records.map((record, index) => (
            <TableCell key={index}>{record}</TableCell>
          ))}
        </TableRow>
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 95%;
  border-collapse: collapse;
  background-color: ${palette.fullWhite};
`;

const TableRow = styled.tr`
  padding: 8px;
  border: 1px solid ${palette.grayBorder};
`;

const TableCell = styled.td`
  padding: 4px;
  text-align: center;
  border: 1px solid ${palette.grayBorder};
`;
