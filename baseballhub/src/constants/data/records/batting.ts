import { BattingStatsType } from "@models/records";

const sampleBattingStats: BattingStatsType = {
  name: "김유안",
  num_games: 16,
  plate_appearances: 51,
  at_bats: 45,
  runs: 6,
  hits: 11,
  doubles: 3,
  triples: 0,
  home_runs: 0,
  total_bases: 14,
  runs_batted_in: 6,
  stolen_bases: 2,
  stolen_bases_caught: 0,
  walks: 5,
  hit_by_pitch: 1,
  strikeouts: 6,
  double_plays: 0,
  sacrifice_bunts: 0,
  sacrifice_flies: 0,
  batting_average: 0.244,
  on_base_percentage: 0.333,
  slugging_percentage: 0.311,
  ops: 0.644,
};

export const sampleBattingStatsList: BattingStatsType[] = [
  sampleBattingStats,
  {
    name: "양서진",
    num_games: 11,
    plate_appearances: 15,
    at_bats: 14,
    runs: 2,
    hits: 2,
    doubles: 0,
    triples: 0,
    home_runs: 0,
    total_bases: 2,
    runs_batted_in: 0,
    stolen_bases: 1,
    stolen_bases_caught: 1,
    walks: 1,
    hit_by_pitch: 0,
    strikeouts: 7,
    double_plays: 0,
    sacrifice_bunts: 0,
    sacrifice_flies: 0,
    batting_average: 0.143,
    on_base_percentage: 0.2,
    slugging_percentage: 0.143,
    ops: 0.343,
  },
];
