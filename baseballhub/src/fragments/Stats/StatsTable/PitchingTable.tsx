import { useEffect, useState } from "react";
import styled from "styled-components";

import { samplePitchingStatsList } from "@data/records";
import { PitchingStatsType } from "@models/records";

export function PitchingTable() {
  const [stats, setStats] = useState<PitchingStatsType[]>([]);

  useEffect(() => {
    // TODO: Fetch pitching stats
    setStats(samplePitchingStatsList);
  }, []);

  return (
    <Table>
      <colgroup>
        <col style={{ width: "60px" }} />
        {Array.from({ length: 16 }).map((_, index) => (
          <col key={index} style={{ width: "40px" }} />
        ))}
        {Array.from({ length: 7 }).map((_, index) => (
          <col key={index} style={{ width: "60px" }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th>이름</th>
          <th>경기</th>
          <th>승</th>
          <th>패</th>
          <th>이닝</th>
          <th>투구수</th>
          <th>타자</th>
          <th>타수</th>
          <th>피안타</th>
          <th>피홈런</th>
          <th>볼넷</th>
          <th>사구</th>
          <th>삼진</th>
          <th>폭투</th>
          <th>보크</th>
          <th>실점</th>
          <th>자책</th>
          <th>ERA</th>
          <th>WHIP</th>
          <th>볼넷/9</th>
          <th>삼진/9</th>
          <th>피안타/9</th>
          <th>피홈런/9</th>
          <th>K/BB</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((stat) => (
          <tr key={stat.name}>
            <td>{stat.name}</td>
            <td>{stat.num_games}</td>
            <td>{stat.wins}</td>
            <td>{stat.losses}</td>
            <td>{stat.innings_pitched}</td>
            <td>{stat.pitches_thrown}</td>
            <td>{stat.batters_faced}</td>
            <td>{stat.at_bats}</td>
            <td>{stat.hits_allowed}</td>
            <td>{stat.homeruns_allowed}</td>
            <td>{stat.walks_allowed}</td>
            <td>{stat.hit_by_pitch}</td>
            <td>{stat.strikeouts}</td>
            <td>{stat.wild_pitches}</td>
            <td>{stat.balks}</td>
            <td>{stat.runs_allowed}</td>
            <td>{stat.earned_runs}</td>
            <td>{stat.earned_run_average}</td>
            <td>{stat.whip}</td>
            <td>{stat.walks_per_nine}</td>
            <td>{stat.strikeouts_per_nine}</td>
            <td>{stat.hits_per_nine}</td>
            <td>{stat.homeruns_per_nine}</td>
            <td>{stat.strikeout_to_walk}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  font-size: 14px;

  border-collapse: collapse;
  table-layout: fixed;
  background-color: ${({ theme }) => theme.colors.background100};

  thead {
    background-color: ${({ theme }) => theme.colors.borderLight};
  }

  th {
    padding: 7px;
    text-align: center;
    color: ${({ theme }) => theme.colors.secondary};
  }

  td {
    padding: 7px;
    text-align: center;
    color: ${({ theme }) => theme.colors.foreground900};
  }
`;
