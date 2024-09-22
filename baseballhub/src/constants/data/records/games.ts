import {
  GameResultsType,
  GameSummaryType,
  TournamentType,
} from "@models/records/game";

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
};

export const Games1: GameSummaryType[] = [
  {
    id: 1,
    date: "2024-04-04",
    time: "11:30",
    opponent: "신안산대",
    location: "횡성",
    tournament: "대학야구 U리그 B조",
    home_runs: 5,
    away_runs: 17,
    result: "패",
    home: true,
    notes: "9회 종료",
  },
  {
    id: 2,
    date: "2024-04-05",
    time: "14:00",
    opponent: "강릉영동대",
    location: "횡성",
    tournament: "대학야구 U리그 B조",
    home_runs: 5,
    away_runs: 24,
    result: "패",
    home: true,
    notes: "5회 콜드게임",
  },
  {
    id: 3,
    date: "2024-04-18",
    time: "09:00",
    opponent: "한국골프대",
    location: "횡성",
    tournament: "대학야구 U리그 B조",
    away_runs: 3,
    home_runs: 3,
    result: "무",
    home: false,
    notes: "9회 종료",
  },
  {
    id: 4,
    date: "2024-04-19",
    time: "11:30",
    opponent: "경민대",
    location: "횡성",
    tournament: "대학야구 U리그 B조",
    home_runs: 9,
    away_runs: 2,
    result: "승",
    home: true,
    notes: "7회 콜드게임",
  },
  {
    id: 5,
    date: "2024-04-23",
    time: "14:00",
    opponent: "여주대",
    location: "횡성",
    tournament: "대학야구 U리그 B조",
    home_runs: 8,
    away_runs: 1,
    result: "패",
    home: false,
    notes: "7회 콜드게임",
  },
  {
    id: 6,
    date: "2024-04-24",
    time: "14:00",
    opponent: "건국대",
    location: "횡성",
    tournament: "대학야구 U리그 B조",
    home_runs: 0,
    away_runs: 12,
    result: "패",
    home: true,
    notes: "5회 콜드게임",
  },
  {
    id: 7,
    date: "2024-05-02",
    time: "09:00",
    opponent: "연세대",
    location: "횡성",
    tournament: "대학야구 U리그 B조",
    home_runs: 1,
    away_runs: 14,
    result: "패",
    home: true,
    notes: "5회 콜드게임",
  },
  {
    id: 8,
    date: "2024-05-03",
    time: "14:00",
    opponent: "경희대",
    location: "횡성",
    tournament: "대학야구 U리그 B조",
    home_runs: 0,
    away_runs: 8,
    result: "패",
    home: true,
    notes: "7회 콜드게임",
  },
];

export const sampleGames: GameSummaryType[] = [
  {
    id: 3,
    date: "2024-04-18",
    time: "09:00",
    opponent: "한국골프대",
    location: "횡성",
    tournament: "대학야구 U리그 B조",
    away_runs: 3,
    home_runs: 3,
    result: "무",
    home: true,
    notes: "9회 종료",
  },
  {
    id: 4,
    date: "2024-04-19",
    time: "11:30",
    opponent: "경민대",
    location: "횡성",
    tournament: "대학야구 U리그 B조",
    home_runs: 2,
    away_runs: 9,
    result: "승",
    home: false,
    notes: "7회 콜드게임",
  },
];

const Games2: GameSummaryType[] = [
  {
    id: 9,
    date: "2024-06-24",
    time: "12:00",
    opponent: "제주국제대",
    location: "보은",
    tournament: "전국대학야구선수권 대회",
    home_runs: 4,
    away_runs: 16,
    result: "패",
    home: true,
    notes: "5회 콜드게임",
  },
  {
    id: 10,
    date: "2024-06-25",
    time: "15:00",
    opponent: "웅지세무대",
    location: "보은",
    tournament: "전국대학야구선수권 대회",
    home_runs: 8,
    away_runs: 1,
    result: "패",
    home: false,
    notes: "8회 콜드게임",
  },
  {
    id: 11,
    date: "2024-07-03",
    time: "18:00",
    opponent: "동원대",
    location: "보은",
    tournament: "전국대학야구선수권 대회",
    home_runs: 4,
    away_runs: 5,
    result: "패",
    home: true,
    notes: "9회 종료",
  },
  {
    id: 12,
    date: "2024-07-06",
    time: "13:00",
    opponent: "충북보건과학대",
    location: "보은",
    tournament: "전국대학야구선수권 대회",
    home_runs: 4,
    away_runs: 9,
    result: "패",
    home: true,
    notes: "9회 종료",
  },
];

const Games3: GameSummaryType[] = [
  {
    id: 13,
    date: "2024-07-23",
    time: "13:00",
    opponent: "건국대",
    location: "신월",
    tournament: "전국체육대회 서울시 대표 선발전",
    home_runs: 6,
    away_runs: 4,
    result: "패",
    home: false,
    notes: "9회 종료",
  },
];

const Games4: GameSummaryType[] = [
  {
    id: 14,
    date: "2024-07-31",
    time: "09:00",
    opponent: "경남대",
    location: "밀양",
    tournament: "대통령기 전국대학야구 대회",
    home_runs: 14,
    away_runs: 2,
    result: "패",
    home: false,
    notes: "5회 콜드게임",
  },
  {
    id: 15,
    date: "2024-08-06",
    time: "09:00",
    opponent: "홍익대",
    location: "밀양",
    tournament: "대통령기 전국대학야구 대회",
    home_runs: 2,
    away_runs: 14,
    result: "패",
    home: true,
    notes: "6회 콜드게임",
  },
  {
    id: 16,
    date: "2024-08-07",
    time: "12:00",
    opponent: "강릉영동대",
    location: "밀양",
    tournament: "대통령기 전국대학야구 대회",
    home_runs: 9,
    away_runs: 2,
    result: "패",
    home: false,
    notes: "8회 콜드게임",
  },
  {
    id: 17,
    date: "2024-08-12",
    time: "12:00",
    opponent: "동아대",
    location: "밀양",
    tournament: "대통령기 전국대학야구 대회",
    home_runs: 5,
    away_runs: 15,
    result: "패",
    home: true,
    notes: "6회 콜드게임",
  },
];

const Games5: GameSummaryType[] = [
  {
    id: 18,
    date: "2024-08-23",
    time: "09:00",
    opponent: "도쿄대",
    location: "도쿄",
    tournament: "도쿄대학교 교류전",
    home_runs: 9,
    away_runs: 2,
    result: "패",
    home: false,
    notes: "9회 종료",
  },
];

export const Tournament1: TournamentType = {
  id: 1,
  name: "대학야구 U리그 B조",
  year: 2024,
  games: Games1,
};

const Tournament2: TournamentType = {
  id: 2,
  name: "전국대학야구선수권 대회",
  year: 2024,
  games: Games2,
};

const Tournament3: TournamentType = {
  id: 3,
  name: "전국체육대회 서울시 대표 선발전",
  year: 2024,
  games: Games3,
};

const Tournament4: TournamentType = {
  id: 4,
  name: "대통령기 전국대학야구 대회",
  year: 2024,
  games: Games4,
};

const Tournament5: TournamentType = {
  id: 5,
  name: "도쿄대학교 교류전",
  year: 2024,
  games: Games5,
};

export const sampleTournaments: TournamentType[] = [
  Tournament1,
  Tournament2,
  Tournament3,
  Tournament4,
  Tournament5,
];
