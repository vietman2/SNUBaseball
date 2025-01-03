import { GameDetailsType, LineupType, ResultType, TournamentType } from "@models/records";

const sampleResults: ResultType[] = [
  {
    id: 1,
    date_time: "8월 1일 09:00",
    location: "Tokyo Dome",
    home_team: "Giants",
    away_team: "Tigers",
    home_score: 5,
    away_score: 3,
    is_home: true,
    is_finished: true,
    result: "승",
  },
  {
    id: 2,
    date_time: "8월 2일 18:00",
    location: "Tokyo Dome",
    home_team: "Giants",
    away_team: "Tigers",
    home_score: 3,
    away_score: 5,
    is_home: false,
    is_finished: false,
    result: "패",
  },
];

export const sampleTournament: TournamentType = {
  id: 1,
  name: "2021 Summer Tournament",
  results: sampleResults,
};

export const sampleLineup: LineupType = {
  starting_pitcher: {
    name: "Yamada Taro",
    position: "P",
    back_number: 1,
    profile_position: "투수",
  },
  order: [
    {
      name: "Suzuki Ichiro",
      position: "CF",
      back_number: 51,
      profile_position: "외야수",
    },
    {
      name: "Tanaka Jiro",
      position: "SS",
      back_number: 6,
      profile_position: "내야수",
    },
    {
      name: "Sato Saburo",
      position: "3B",
      back_number: 7,
      profile_position: "내야수",
    },
    {
      name: "Nakamura Shiro",
      position: "1B",
      back_number: 3,
      profile_position: "내야수",
    },
    {
      name: "Kato Goro",
      position: "LF",
      back_number: 8,
      profile_position: "외야수",
    },
    {
      name: "Watanabe Rokuro",
      position: "RF",
      back_number: 9,
      profile_position: "외야수",
    },
    {
      name: "Yamamoto Shichiro",
      position: "2B",
      back_number: 4,
      profile_position: "내야수",
    },
    {
      name: "Sasaki Hachiro",
      position: "C",
      back_number: 2,
      profile_position: "포수",
    },
    {
      name: "Yamada Taro",
      position: "P",
      back_number: 1,
      profile_position: "투수",
    },
  ],
  bench: [
    {
      name: "Ito Juro",
      position: "CF",
      back_number: 52,
      profile_position: "외야수",
    },
    {
      name: "Suzuki Jiro",
      position: "SS",
      back_number: 16,
      profile_position: "내야수",
    },
    {
      name: "Sato Shiro",
      position: "3B",
      back_number: 17,
      profile_position: "내야수",
    },
  ],
  managers: [
    {
      name: "Yamada Taro",
      position: "Manager",
      back_number: 88,
      profile_position: "매니저",
    },
  ],
};

export const sampleGame: GameDetailsType = {
  id: 1,
  youtube_videoid: "sample",
  lineup: sampleLineup,
};
