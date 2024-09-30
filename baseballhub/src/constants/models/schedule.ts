export type DailyPersonalScheduleType = {
  attendance: string; // "O" | "X" | "△";
  time?: string;
  reason?: string;
};

export type WeeklyTimetableType = {
  index: number | "합";
  name: string;
  major: string;
  phone: string;
  year: string;
  dailySchedules: DailyPersonalScheduleType[];
  total: number;
};

type TimetableType = {
  time: string;
  program: string;
  location: string;
  note: string;
};

export type DailyScheduleType = {
  date: string;
  time: string;
  location: string;
  goal: string;
  coach: string;
  weather: string;
  timetables: TimetableType[];
};
