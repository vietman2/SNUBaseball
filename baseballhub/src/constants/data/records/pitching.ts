import { PitchingStatsType } from "@models/records";

const samplePitchingStats: PitchingStatsType = {
  name: "김유안",
  num_games: 12,
  innings_pitched: 40,
  wins: 0,
  losses: 3,
  pitches_thrown: 808,
  batters_faced: 211,
  at_bats: 178,
  hits_allowed: 56,
  homeruns_allowed: 3,
  walks_allowed: 26,
  hit_by_pitch: 1,
  strikeouts: 45,
  wild_pitches: 9,
  balks: 1,
  runs_allowed: 50,
  earned_runs: 39,
  earned_run_average: 8.78,
  whip: 2.05,
  walks_per_nine: 5.85,
  strikeouts_per_nine: 10.13,
  hits_per_nine: 14.85,
  homeruns_per_nine: 1.52,
  strikeout_to_walk: 1.73,
};

export const samplePitchingStatsList: PitchingStatsType[] = [
  samplePitchingStats,
  {
    name: "이상현",
    num_games: 6,
    innings_pitched: 10.1,
    wins: 0,
    losses: 2,
    pitches_thrown: 279,
    batters_faced: 75,
    at_bats: 47,
    hits_allowed: 19,
    homeruns_allowed: 0,
    walks_allowed: 18,
    hit_by_pitch: 8,
    strikeouts: 6,
    wild_pitches: 10,
    balks: 0,
    runs_allowed: 28,
    earned_runs: 15,
    earned_run_average: 13.5,
    whip: 3.7,
    walks_per_nine: 15.68,
    strikeouts_per_nine: 5.23,
    hits_per_nine: 16.58,
    homeruns_per_nine: 0.0,
    strikeout_to_walk: 0.33,
  },
];
