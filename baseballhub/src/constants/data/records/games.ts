import { GameResultsType } from "@models/records";

export const sampleGameResult: GameResultsType = {
  id: 1,
  date: "2024-04-19",
  time: "11:30",
  home_team: "서울대",
  away_team: "경민대",
  location: "횡성",
  tournament: "대학야구 U리그 B조",
  score: "2:9",
  result: "승",
  home_runs: [0, 4, 4, 0, 0, 1, 0, -1, -1],
  away_runs: [0, 1, 0, 0, 0, 0, 1, -1, -1],
  home_records: [9, 5, 1, 11],
  away_records: [2, 6, 1, 5],
  lineup: [
    {
      order: 1,
      batters: [
        {
          name: "김유안",
          positions: ["2B", "SS", "P"],
          number: 7,
          plate_appearances: 4,
          at_bats: 4,
          runs_scored: 2,
          hits: 1,
          rbis: 3,
          walks_hbps: 0,
          strikeouts: 1,
          steals: 1,
        },
      ],
    },
    {
      order: 2,
      batters: [
        {
          name: "이서준",
          positions: ["SS", "P", "SS"],
          number: 1,
          plate_appearances: 4,
          at_bats: 3,
          runs_scored: 0,
          hits: 1,
          rbis: 2,
          walks_hbps: 1,
          strikeouts: 0,
          steals: 0,
        },
      ],
    },
    {
      order: 3,
      batters: [
        {
          name: "이진산",
          positions: ["3B"],
          number: 6,
          plate_appearances: 4,
          at_bats: 2,
          runs_scored: 1,
          hits: 1,
          rbis: 1,
          walks_hbps: 2,
          strikeouts: 0,
          steals: 0,
        },
      ],
    },
    {
      order: 4,
      batters: [
        {
          name: "박건우",
          positions: ["RF"],
          number: 25,
          plate_appearances: 4,
          at_bats: 4,
          runs_scored: 0,
          hits: 0,
          rbis: 0,
          walks_hbps: 0,
          strikeouts: 1,
          steals: 0,
        },
      ],
    },
    {
      order: 5,
      batters: [
        {
          name: "이상엽",
          positions: ["P", "2B"],
          number: 10,
          plate_appearances: 4,
          at_bats: 1,
          runs_scored: 2,
          hits: 1,
          rbis: 0,
          walks_hbps: 3,
          strikeouts: 0,
          steals: 5,
        },
      ],
    },
    {
      order: 6,
      batters: [
        {
          name: "김정규",
          positions: ["CF"],
          number: 21,
          plate_appearances: 4,
          at_bats: 1,
          runs_scored: 2,
          hits: 0,
          rbis: 0,
          walks_hbps: 3,
          strikeouts: 0,
          steals: 3,
        },
      ],
    },
    {
      order: 7,
      batters: [
        {
          name: "정승원",
          positions: ["1B"],
          number: 16,
          plate_appearances: 4,
          at_bats: 3,
          runs_scored: 2,
          hits: 1,
          rbis: 1,
          walks_hbps: 1,
          strikeouts: 1,
          steals: 1,
        },
      ],
    },
    {
      order: 8,
      batters: [
        {
          name: "남기헌",
          positions: ["C"],
          number: 30,
          plate_appearances: 4,
          at_bats: 3,
          runs_scored: 0,
          hits: 0,
          rbis: 0,
          walks_hbps: 1,
          strikeouts: 1,
          steals: 0,
        },
      ],
    },
    {
      order: 9,
      batters: [
        {
          name: "윤동현",
          positions: ["LF"],
          number: 24,
          plate_appearances: 3,
          at_bats: 3,
          runs_scored: 0,
          hits: 0,
          rbis: 0,
          walks_hbps: 0,
          strikeouts: 2,
          steals: 0,
        },
      ],
    },
  ],
  pitchers: [
    {
      name: "이상엽",
      number: 10,
      result: "-",
      innings_pitched: 2,
      batter_faced: 8,
      pitches: 37,
      hits: 2,
      homeruns: 0,
      walks: 2,
      hbps: 0,
      strikeouts: 2,
      runs_allowed: 1,
      earned_runs: 1,
    },
    {
      name: "이서준",
      number: 1,
      result: "승",
      innings_pitched: 3,
      batter_faced: 13,
      pitches: 50,
      hits: 2,
      homeruns: 0,
      walks: 1,
      hbps: 1,
      strikeouts: 3,
      runs_allowed: 0,
      earned_runs: 0,
    },
    {
      name: "김유안",
      number: 7,
      result: "-",
      innings_pitched: 2,
      batter_faced: 9,
      pitches: 28,
      hits: 2,
      homeruns: 0,
      walks: 1,
      hbps: 0,
      strikeouts: 1,
      runs_allowed: 1,
      earned_runs: 1,
    },
  ],
  bench: [
    {
      name: "임준원",
      number: 2,
      hand: "우투우타",
    },
    {
      name: "문중협",
      number: 5,
      hand: "우투우타",
    },
    {
      name: "양서진",
      number: 8,
      hand: "우투우타",
    },
    {
      name: "이승민",
      number: 9,
      hand: "우투우타",
    },
    {
      name: "이상현",
      number: 11,
      hand: "우투우타",
    },
    {
      name: "김영",
      number: 13,
      hand: "우투우타",
    },
    {
      name: "유찬휘",
      number: 14,
      hand: "우투우타",
    },
    {
      name: "김택원",
      number: 17,
      hand: "우투우타",
    },
    {
      name: "유호성",
      number: 18,
      hand: "우투좌타",
    },
    {
      name: "허준서",
      number: 20,
      hand: "좌투좌타",
    },
    {
      name: "이유용",
      number: 23,
      hand: "우투우타",
    },
  ],
  feedback: [
    "좋은 경기였습니다.",
    "이번 경기에서는 팀원들이 잘 해냈습니다.",
    "팀원들의 노력이 빛났습니다.",
  ],
};
