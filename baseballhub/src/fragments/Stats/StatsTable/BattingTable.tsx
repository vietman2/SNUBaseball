import { useEffect, useState } from "react";
import styled from "styled-components";

import { sampleBattingStatsList } from "@data/records";
import { BattingStatsType } from "@models/records";

export function BattingTable() {
  const [stats, setStats] = useState<BattingStatsType[]>([]);

  useEffect(() => {
    // TODO: Fetch batting stats
    setStats(sampleBattingStatsList);
  }, []);

  return (
    <Table>
      <colgroup>
        <col style={{ width: "60px" }} />
        {Array.from({ length: 18 }).map((_, index) => (
          <col key={index} style={{ width: "40px" }} />
        ))}
        {Array.from({ length: 4 }).map((_, index) => (
          <col key={index} style={{ width: "60px" }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th>이름</th>
          <th>경기</th>
          <th>타석</th>
          <th>타수</th>
          <th>득점</th>
          <th>안타</th>
          <th>2루타</th>
          <th>3루타</th>
          <th>홈런</th>
          <th>루타</th>
          <th>타점</th>
          <th>도루</th>
          <th>도실</th>
          <th>볼넷</th>
          <th>사구</th>
          <th>삼진</th>
          <th>병살</th>
          <th>희번</th>
          <th>희플</th>
          <th>타율</th>
          <th>출루율</th>
          <th>장타율</th>
          <th>OPS</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((stat) => (
          <tr key={stat.name}>
            <td>{stat.name}</td>
            <td>{stat.num_games}</td>
            <td>{stat.plate_appearances}</td>
            <td>{stat.at_bats}</td>
            <td>{stat.runs}</td>
            <td>{stat.hits}</td>
            <td>{stat.doubles}</td>
            <td>{stat.triples}</td>
            <td>{stat.home_runs}</td>
            <td>{stat.total_bases}</td>
            <td>{stat.runs_batted_in}</td>
            <td>{stat.stolen_bases}</td>
            <td>{stat.stolen_bases_caught}</td>
            <td>{stat.walks}</td>
            <td>{stat.hit_by_pitch}</td>
            <td>{stat.strikeouts}</td>
            <td>{stat.double_plays}</td>
            <td>{stat.sacrifice_bunts}</td>
            <td>{stat.sacrifice_flies}</td>
            <td>{stat.batting_average}</td>
            <td>{stat.on_base_percentage}</td>
            <td>{stat.slugging_percentage}</td>
            <td>{stat.ops}</td>
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
